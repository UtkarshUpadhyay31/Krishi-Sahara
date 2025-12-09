#!/bin/bash

# 🚀 Krishi Sahara Mobile App Builder
# Quick script to build and deploy your Android app

set -e  # Exit on error

echo "🌾 Krishi Sahara Mobile App Builder"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}➜${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Main menu
echo "What would you like to do?"
echo ""
echo "1. Build APK (Debug)"
echo "2. Build APK (Release - Signed)"
echo "3. Open in Android Studio"
echo "4. Run on connected device"
echo "5. Check Capacitor setup"
echo "6. Clean and rebuild"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        print_step "Building debug APK..."
        print_step "Step 1/3: Building React app..."
        npm run build
        print_success "React app built"
        
        print_step "Step 2/3: Syncing with Capacitor..."
        npx cap sync android
        print_success "Capacitor synced"
        
        print_step "Step 3/3: Building Android APK..."
        cd android
        ./gradlew assembleDebug
        cd ..
        print_success "APK built successfully!"
        
        echo ""
        print_success "✨ Your APK is ready!"
        echo "Location: android/app/build/outputs/apk/debug/app-debug.apk"
        echo ""
        read -p "Do you want to install it on a connected device? (y/n): " install
        if [ "$install" = "y" ]; then
            adb install android/app/build/outputs/apk/debug/app-debug.apk
            print_success "App installed on device!"
        fi
        ;;
        
    2)
        print_warning "Building release APK requires a signing keystore"
        read -p "Do you have a keystore configured? (y/n): " has_keystore
        if [ "$has_keystore" = "y" ]; then
            print_step "Building release APK..."
            npm run build
            npx cap sync android
            cd android
            ./gradlew assembleRelease
            cd ..
            print_success "Release APK built!"
            echo "Location: android/app/build/outputs/apk/release/app-release.apk"
        else
            print_warning "Please configure your keystore first. See MOBILE_APP_GUIDE.md for instructions."
        fi
        ;;
        
    3)
        print_step "Opening Android Studio..."
        npm run mobile:open
        ;;
        
    4)
        print_step "Building and running on device..."
        npm run mobile:run
        print_success "App running on device!"
        ;;
        
    5)
        print_step "Checking Capacitor setup..."
        npx cap doctor
        ;;
        
    6)
        print_step "Cleaning project..."
        rm -rf build
        rm -rf android/app/build
        print_success "Clean complete"
        
        print_step "Rebuilding..."
        npm run build
        npx cap sync android
        cd android
        ./gradlew assembleDebug
        cd ..
        print_success "Rebuild complete!"
        ;;
        
    *)
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
print_success "Done! 🎉"
echo ""
echo "Need help? Check:"
echo "  • BUILD_APK.md - Quick start"
echo "  • MOBILE_APP_GUIDE.md - Full guide"
echo "  • MOBILE_APP_COMPLETE.md - Summary"
