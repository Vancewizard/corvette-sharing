# 🚢 Corvette Design Sharing Community

Welcome to the community-driven database of corvette ship designs! Share your amazing designs and discover creations from other builders.

## 🌐 View the Gallery

Visit our live gallery: [https://abendrothj.github.io/corvette-sharing](https://abendrothj.github.io/corvette-sharing)

## 🚀 Quick Start

1. **Browse designs** - Check out the community gallery
2. **Share your design** - Follow our [contribution guide](CONTRIBUTING.md)
3. **Download designs** - Get JSON files and build instructions

## 📂 How to Contribute

1. Fork this repository
2. Add your design image to `designs/images/`
3. Add your design JSON to `designs/data/`
4. Update `designs/index.json` with your design entry
5. Create a pull request

See our detailed [Contributing Guide](CONTRIBUTING.md) for more information.

## 🏗️ What's Included

- **Interactive Gallery** - Browse and filter designs
- **Detailed Specifications** - Complete build data
- **Search & Filter** - Find designs by type, author, or features
- **Download Links** - Get design files directly
- **Community Driven** - All designs contributed by the community

## 🎯 Design Categories

- **Combat** - Military and attack vessels
- **Exploration** - Long-range exploration ships
- **Transport** - Cargo and passenger vessels
- **Mining** - Resource gathering ships

## 📋 Requirements

Each design submission should include:
- High-quality screenshot (800x600+ resolution)
- JSON file with specifications and build notes
- Tested and functional design

## 🤝 Community

- Share your builds and get feedback
- Help newcomers learn ship design
- Discover new building techniques
- Collaborate on design improvements

Start exploring and sharing your corvette designs today!

## 🧰 Share and Import Corvettes (Objects JSON)

Always back up/copy your save data before accessing/editing JSON files. Changing JSON data can break your save.

### Tooling

- Use the lightweight Python utilities from `nms-corvette-sharing` to export and reinsert a ship-associated base `Objects` payload. See the repo for details and latest updates: [Effex-D/nms-corvette-sharing](https://github.com/Effex-D/nms-corvette-sharing/).

High-level behavior of the tools:
- Exporter: find ship by Name → derive seed (HEX→DEC) → find `PlayerShipBase` by timestamp → write that base’s `Objects` to a JSON file.
- Inserter: find the same ship/base → replace only that base’s `Objects` with a payload you provide.

### How to Share (Player 1)

1. Export your save to JSON (e.g., using NomNom’s editor).
2. Use the exporter to extract your ship’s base `Objects`:
   - Example: `python nms_objects_exporter.py --input /path/to/save.json --ship "Exact Ship Name" --output ./objects.json --tolerance-seconds 60`
3. Share the resulting `objects.json` via a paste/link service (e.g., Pastebin).

### How to Import (Player 2)

1. In-game, create a corvette you plan to overwrite (any size/design).
2. Equip a different ship (not the one you plan to overwrite).
3. Save your game by entering/exiting the cockpit seat, then exit.
4. Open your save in a JSON editor.
5. Use the inserter to replace the target corvette’s base `Objects` field with Player 1’s payload:
   - Example: `python nms_objects_inserter.py --save-in /path/to/save.json --ship "Exact Ship Name" --objects ./objects.json --save-out ./patched_save.json --tolerance-seconds 60`
6. Load your patched save and verify the ship.

Reference discussion/guidance adapted from community posts: [Nexus Mods – No Man’s Sky (mod 3791, Posts tab)](https://www.nexusmods.com/nomanssky/mods/3791?tab=posts).

Notes:
- Increase `--tolerance-seconds` if the tool can’t match the base on the first try.
- These tools only modify the matched base’s `Objects` field.