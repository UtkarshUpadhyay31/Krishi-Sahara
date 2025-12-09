#!/bin/bash

# Script to accept Android SDK licenses and fix permissions
# Run this with: sudo bash accept-licenses.sh

set -e

echo "🔑 Setting up Android SDK..."

# Get the current user
CURRENT_USER=${SUDO_USER:-$USER}
echo "Setting permissions for user: $CURRENT_USER"

# Create necessary directories
mkdir -p /opt/android-sdk/licenses
mkdir -p /opt/android-sdk/platforms
mkdir -p /opt/android-sdk/build-tools

# Accept Android SDK License
echo "24333f8a63b6825ea9c5514f83c2829b004d1fee" > /opt/android-sdk/licenses/android-sdk-license

# Accept Android SDK Preview License
echo "84831b9409646a918e30573bab4c9c91346d8abd" > /opt/android-sdk/licenses/android-sdk-preview-license

# Accept Google GMS License
echo "d975f751698a77b662f1254ddbeed3901e976f5a" > /opt/android-sdk/licenses/google-gdk-license

# Accept Intel HAXM License
echo "33b6a2b64607f11b759f320ef9dff4ae5c47d97a" > /opt/android-sdk/licenses/intel-android-extra-license

# Set proper permissions on licenses
chmod 644 /opt/android-sdk/licenses/*

# Make the SDK directory writable by the current user
echo "Fixing SDK directory permissions..."
chown -R $CURRENT_USER:$CURRENT_USER /opt/android-sdk

echo "✅ Android SDK setup complete!"
echo ""
echo "You can now run: cd android && ./gradlew assembleDebug"
