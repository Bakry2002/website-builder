# Rekaz Builder Pro

A modern, feature-rich website builder application built with Next.js, React, TypeScript, and Tailwind CSS. This project Mimics a mini website builder tool.

## 🚀 Live Demo

**URL**: https://website-builder-chi-gold.vercel.app/

## 🎯 Project Overview

This website builder allows users to create professional websites without coding knowledge through an intuitive drag-and-drop interface. The application features a comprehensive set of tools for building, customizing, and previewing websites in real-time.

## ✨ Key Features

### 🏗️ Core Builder Features
- **Drag & Drop Interface**: Intuitive section reordering with visual feedback
- **Live Preview**: Real-time rendering of changes with toggle between edit/preview modes
- **Section Library**: Pre-built components (Hero, Header, Footer, Content, Gallery)
- **Template Gallery**: Professional starter templates for quick setup
- **Auto-save**: Automatic saving to localStorage with visual indicators
- **Export/Import**: A JSON-based export/import file to export your design or import it in a JSON file for later use.
- **Global Style Management**: Unified color schemes and typography
- **Multiple Device Screen previewer**: Ability to give the user in real-time, a preview for the website in different device screens i.e., mobile, tablet, and monitor.

### State Management
- **Local State**: React hooks for component-level state
- **Global State**: Zustand store to manage the build states and access it from the whole codebase.
- **Persistence**: Zustand localStorage persistence for auto-save functionality

### Data Flow
1. User interacts with Section Library or Template Gallery
2. Actions dispatch to WebsiteBuilder state
3. PreviewCanvas renders sections with SectionRenderer
4. PropertiesPanel allows real-time content editing
5. StylePanel manages global design system
6. Auto-save persists changes to localStorage


## 🚀 Getting Started

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd website-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
