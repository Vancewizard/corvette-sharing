# Contributing to Corvette Design Sharing

Welcome to the Corvette Design Sharing community! We're excited to see your amazing ship designs.

## How to Contribute

### 1. Prepare Your Files

You'll need two files:
- **Image**: A screenshot of your corvette (JPG/PNG, max 5MB)
- **JSON file**: Design specifications and metadata

### 2. File Structure

```
designs/
├── images/
│   └── your-design-name.jpg
├── data/
│   └── your-design-name.json
└── index.json (you'll edit this)
```

### 3. JSON Format

Your design JSON should include:

```json
{
  "name": "Your Corvette Name",
  "author": "YourUsername",
  "version": "1.0",
  "description": "Brief description of your design",
  "tags": ["combat", "exploration", "transport"],
  "specifications": {
    "length": "100m",
    "mass": "800 tons",
    "maxSpeed": "150 m/s",
    "armor": "Medium Steel",
    "crew": 6
  },
  "components": {
    "hull": { "material": "Steel", "thickness": "30cm" },
    "propulsion": { "mainThrusters": "4x Large Ion" },
    "weapons": { "primary": "Railgun Turret" },
    "systems": { "reactor": "Large Reactor" }
  },
  "buildNotes": [
    "Important construction tips",
    "Special considerations"
  ]
}
```

### 4. Update index.json

Add your design to the `designs/index.json` file:

```json
{
  "designs": [
    {
      "id": "your-design-name",
      "name": "Your Corvette Name",
      "author": "YourUsername",
      "description": "Brief description",
      "image": "your-design-name.jpg",
      "dataFile": "your-design-name.json",
      "tags": ["tag1", "tag2"],
      "version": "1.0",
      "dateAdded": "2024-01-30",
      "specifications": {
        "Length": "100m",
        "Mass": "800 tons",
        "Max Speed": "150 m/s"
      }
    }
  ]
}
```

### 5. Submit Your Design

1. Fork this repository
2. Add your files to the appropriate directories
3. Update `designs/index.json` with your design entry
4. Create a pull request

## Design Guidelines

### Tags
Use these standard tags to help categorize your design:
- **combat**: Military/combat vessels
- **exploration**: Long-range exploration ships
- **transport**: Cargo and passenger transport
- **mining**: Resource gathering vessels
- **fast**: High-speed designs
- **heavy**: Heavily armored designs
- **light**: Lightweight, agile designs
- **stealth**: Low-profile designs
- **multipurpose**: Versatile designs

### Image Guidelines
- **Resolution**: Minimum 800x600, recommended 1200x900
- **Format**: JPG or PNG
- **Size**: Keep under 5MB
- **Quality**: Use high graphics settings
- **Content**: Show your ship clearly, avoid UI elements

### Design Quality
- Test your design thoroughly
- Include build instructions or tips
- Provide accurate specifications
- Ensure the design is actually functional

## Code of Conduct

- Be respectful and constructive
- Credit original designers if adapting existing designs
- Don't upload copyrighted content
- Keep descriptions family-friendly
- Help newcomers learn and improve

## Questions?

Feel free to open an issue if you need help or have questions about contributing!

Happy building! 🚢