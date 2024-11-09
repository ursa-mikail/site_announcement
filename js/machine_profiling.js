        function getProfileInfo() {
            var profileInfo = [
                { label: 'User Agent', value: navigator.userAgent },
                { label: 'Platform', value: navigator.platform },
                { label: 'Language', value: navigator.language },
                { label: 'Cookies Enabled', value: navigator.cookieEnabled },
                { label: 'Screen Resolution', value: screen.width + 'x' + screen.height },
                { label: 'Available Screen Resolution', value: screen.availWidth + 'x' + screen.availHeight },
                { label: 'Color Depth', value: screen.colorDepth + ' bits' },
                { label: 'Online Status', value: navigator.onLine ? 'Online' : 'Offline' },
                { label: 'Number of CPU Cores', value: navigator.hardwareConcurrency },
                { label: 'Java Enabled', value: navigator.javaEnabled() ? 'Yes' : 'No' },
                { label: 'Do Not Track', value: navigator.doNotTrack ? 'Enabled' : 'Disabled' },
                { label: 'Local Time', value: new Date().toLocaleString() }
            ];

            // Performance Timing Information
            if (window.performance && performance.timing) {
                var timing = performance.timing;
                profileInfo.push({ label: 'Page Load Time', value: (timing.loadEventEnd - timing.navigationStart) + ' ms' });
                profileInfo.push({ label: 'DOM Content Loaded Time', value: (timing.domContentLoadedEventEnd - timing.domLoading) + ' ms' });
            }

            return profileInfo;
        }

        function displayProfileInfo(profileInfo) {
            var profileDiv = document.getElementById('profile');
            profileInfo.forEach(function(info) {
                var infoDiv = document.createElement('div');
                infoDiv.className = 'profile-info';
                infoDiv.textContent = info.label + ': ' + info.value;
                profileDiv.appendChild(infoDiv);
            });
        }

        var profileInfo = getProfileInfo();
        displayProfileInfo(profileInfo);

