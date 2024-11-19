#!/bin/bash

# Function to generate RSA key pair
generate_rsa_key_pair() {
    local key_length=$1
    openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:$key_length
    openssl rsa -pubout -in private_key.pem -out public_key.pem
    echo "RSA key pair generated with key length $key_length"
}

# Function to generate ECDSA key pair
generate_ecdsa_key_pair() {
    openssl ecparam -name prime256v1 -genkey -noout -out private_key.pem
    openssl ec -in private_key.pem -pubout -out public_key.pem
    echo "ECDSA key pair generated using P-256 curve"
}

# Function to generate EdDSA key pair
generate_eddsa_key_pair() {
    openssl genpkey -algorithm Ed25519 -out private_key.pem
    openssl pkey -in private_key.pem -pubout -out public_key.pem
    echo "EdDSA key pair generated using Ed25519"
}

# Function to generate random bytes (for signature generation)
generate_random_bytes() {
    head -c 32 /dev/urandom | xxd -p | tr -d '\n'
}

# Function to generate a dummy signature (simulation for this example)
generate_signature() {
    # This is a placeholder. You can implement actual signing logic here.
    echo "dummy-signature"
}

# Function to verify signature (simulation for this example)
verify_signature() {
    # This is a placeholder. You can implement actual verification logic here.
    echo "Signature verified."
}

# Function to display keys in hexadecimal
display_keys_in_hex() {
    local key_type=$1
    
    if [ "$key_type" == "rsa" ]; then
        echo "Private Key (RSA) in Hex:"
        # Extract private key in raw format and convert to hex
        openssl rsa -in private_key.pem -outform DER | xxd -p | tr -d '\n'
        echo ""
        echo "Public Key (RSA) in Hex:"
        # Extract public key in raw format and convert to hex
        openssl rsa -pubin -in public_key.pem -outform DER | xxd -p | tr -d '\n'
    elif [ "$key_type" == "ecdsa" ]; then
        echo "Private Key (ECDSA) in Hex:"
        # Extract private key in raw format and convert to hex
        openssl ec -in private_key.pem -outform DER | xxd -p | tr -d '\n'
        echo ""
        echo "Public Key (ECDSA) in Hex:"
        # Extract public key in raw format and convert to hex
        openssl ec -pubin -in public_key.pem -outform DER | xxd -p | tr -d '\n'
    elif [ "$key_type" == "eddsa" ]; then
        echo "Private Key (EdDSA) in Hex:"
        # EdDSA keys are typically output in PEM format, which can be converted directly to hex
        xxd -p private_key.pem | tr -d '\n'
        echo ""
        echo "Public Key (EdDSA) in Hex:"
        # EdDSA public key in PEM format to hex
        xxd -p public_key.pem | tr -d '\n'
    fi
}


# Main driver to call functions
echo "Unit Test: Generate, Sign, and Verify Signature"

# Ask for algorithm choice
echo "Choose Key Algorithm: "
echo "1. RSA"
echo "2. ECDSA"
echo "3. EdDSA"
read -p "Enter your choice (1, 2, or 3): " choice

# Ask for key length (if applicable)
if [ "$choice" == "1" ]; then
    read -p "Enter RSA Key Length (e.g., 2048, 4096): " key_length
    generate_rsa_key_pair $key_length
    key_type="rsa"
elif [ "$choice" == "2" ]; then
    echo "ECDSA uses the P-256 curve by default."
    generate_ecdsa_key_pair
    key_type="ecdsa"
elif [ "$choice" == "3" ]; then
    echo "EdDSA uses Ed25519 by default."
    generate_eddsa_key_pair
    key_type="eddsa"
else
    echo "Invalid choice. Exiting."
    exit 1
fi

# Generate Random Bytes
random_bytes=$(generate_random_bytes)
echo "Random Bytes: $random_bytes"

# Generate Signature
signature=$(generate_signature)
echo "Generated Signature: $signature"

# Verify Signature
verify_signature

# Display keys in hexadecimal
echo "================================================================"
display_keys_in_hex $key_type
echo "================================================================"
