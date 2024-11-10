var dir_images = '../images/';
const url = "https://github.com/ursa-mikail/sql_csv_yaml_json_porting/tree/main/sample_data/data/";
const site1 = url + 'data.yaml';
const site2 = url + 'data.db';
const site3 = url + 'data.json';
const site4 = url + 'data.csv';

function redirectToSite(site) {
    window.location.href = site;
}

function change_it(what_file) {
    var file_extension = ".png";
    document.photo.src = what_file + file_extension;
}

function default_img() {
    document.photo.src = dir_images + "d.png";
}

document.addEventListener('mousemove', (event) => {
    const clock = document.getElementById('clock');
    clock.style.left = event.pageX + 10 + 'px'; // Offset by 10px to avoid direct overlap
    clock.style.top = event.pageY + 10 + 'px'; // Offset by 10px to avoid direct overlap
});

function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = now.toLocaleString('default', { weekday: 'long' });
    const month = now.toLocaleString('default', { month: 'long' });
    const date = now.getDate();
    const year = now.getFullYear();
    clock.innerHTML = `${day} ${date} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to set the clock immediately

document.addEventListener('DOMContentLoaded', () => {
    const selectElementHTML = document.getElementById('content-select');
    const selectElementXML = document.getElementById('content-select-xml');

    if (selectElementHTML) {
        selectElementHTML.addEventListener('change', (event) => {
            const file = event.target.value;
            loadContent(file, 'html');
        });
    }

    if (selectElementXML) {
        selectElementXML.addEventListener('change', (event) => {
            const file = event.target.value;
            loadContent(file, 'xml');
        });
    }

    // Load default content
    if (selectElementHTML && selectElementHTML.value) {
        loadContent(selectElementHTML.value, 'html');
    } else if (selectElementXML && selectElementXML.value) {
        loadContent(selectElementXML.value, 'xml');
    }
});

function loadContent(file, type) {
    const iframe = document.getElementById('content-iframe');
    if (type === 'html') {
        iframe.src = `./announcement/${file}.${type}`;
    } else if (type === 'xml') {
        fetch(`./announcement/${file}.xml`)
            .then(response => response.text())
            .then(xmlText => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
                const xsltProcessor = new XSLTProcessor();

                // Fetch and apply XSLT transformation
                fetch('./announcement/transform.xslt')
                    .then(response => response.text())
                    .then(xsltText => {
                        const xsltDoc = parser.parseFromString(xsltText, 'application/xml');
                        xsltProcessor.importStylesheet(xsltDoc);
                        
                        const resultDocument = xsltProcessor.transformToDocument(xmlDoc);
                        const resultHtml = new XMLSerializer().serializeToString(resultDocument);

                        // Open iframe document and write the transformed content
                        iframe.contentDocument.open();
                        iframe.contentDocument.write(resultHtml);
                        iframe.contentDocument.close();
                    })
                    .catch(error => {
                        console.error("XSLT Error:", error);
                        iframe.contentDocument.open();
                        iframe.contentDocument.write("Error loading XSLT");
                        iframe.contentDocument.close();
                    });
            })
            .catch(error => {
                console.error("XML Error:", error);
                iframe.contentDocument.open();
                iframe.contentDocument.write("Error loading XML");
                iframe.contentDocument.close();
            });
    }
}

// Autocomplete and Autocorrect
document.addEventListener('DOMContentLoaded', function() {
  fetch('../data/wordlist.small.txt')
    .then(response => response.text())
    .then(data => {
      // Split the text file data into an array of words
      var words = data.split(/\r?\n/);
      // Initialize the autocomplete functionality with the words array
      autocomplete(document.getElementById("myInput"), words);
    })
    .catch(error => console.error('Error loading word list:', error));
});

function autocomplete(input, arr) {
  var currentFocus;
  input.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    closeAllLists();
    if (!val) return false;
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function(e) {
          input.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  input.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) { //up
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != input) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

