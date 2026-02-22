# Byte-Level Repository Audit

## Scope

- Tracked files audited: **454**
- Source set: `git ls-files` (tracked repository contents only).
- Hash algorithm: SHA-256 per file.

## Integrity and Encoding

- Files containing NUL byte(s): **143**
- Files failing UTF-8 decode: **143**
- Files with mixed LF/CRLF newline patterns: **119**

### NUL-byte files

- `IMG_1183_Original.jpg`
- `IMG_1335_Original.jpg`
- `IMG_1380_Original.jpg`
- `IMG_1805_Original.jpg`
- `IMG_3053_Original.jpg`
- `Past_work_webp/3 PHase Service.webp`
- `Past_work_webp/7550693456474594645.webp`
- `Past_work_webp/After me.webp`
- `Past_work_webp/Air Compressor.webp`
- `Past_work_webp/Barn.webp`
- `Past_work_webp/Before me.webp`
- `Past_work_webp/Blower Motor.webp`
- `Past_work_webp/CT CABINET Service upgrade.webp`
- `Past_work_webp/Conduit Piping.webp`
- `Past_work_webp/Conduit.webp`
- `Past_work_webp/Control Cabinet.webp`
- `Past_work_webp/Control Work.webp`
- `Past_work_webp/Counter Bar Lighting.webp`
- `Past_work_webp/Dust Collector System.webp`
- `Past_work_webp/Dust Collector motor.webp`
- `Past_work_webp/EMT Piping.webp`
- `Past_work_webp/Electrical Panels.webp`
- `Past_work_webp/Exterior Light Fixtures.webp`
- `Past_work_webp/Field Controls.webp`
- `Past_work_webp/Fire Response.webp`
- `Past_work_webp/Gas Station Service Call .webp`
- `Past_work_webp/Horse Barn.webp`
- `Past_work_webp/Horse Stall Lighting.webp`
- `Past_work_webp/IMG_0733.webp`
- `Past_work_webp/IMG_0852.webp`
- `Past_work_webp/IMG_1380.webp`
- `Past_work_webp/IMG_1599_Original.webp`
- `Past_work_webp/IMG_8814.webp`
- `Past_work_webp/Interior LED lighitng.webp`
- `Past_work_webp/LED Hand Rail.webp`
- `Past_work_webp/LED HandRail.webp`
- `Past_work_webp/LED shelves.webp`
- `Past_work_webp/LOGO.webp`
- `Past_work_webp/Light Fixture.webp`
- `Past_work_webp/Lighting Fixture.webp`
- `Past_work_webp/Lighting.webp`
- `Past_work_webp/Low Voltage LED.webp`
- `Past_work_webp/Meter Socket Bank.webp`
- `Past_work_webp/Motor Control.webp`
- `Past_work_webp/Motor.webp`
- `Past_work_webp/Multi panel Assembly.webp`
- `Past_work_webp/Panel Work.webp`
- `Past_work_webp/Piping (2).webp`
- `Past_work_webp/Piping.webp`
- `Past_work_webp/Residential Electrical.webp`
- `Past_work_webp/Residential Panel.webp`
- `Past_work_webp/Residential Wiring.webp`
- `Past_work_webp/Residential panel  work.webp`
- `Past_work_webp/Selenoids.webp`
- `Past_work_webp/Service after.webp`
- `Past_work_webp/Service before.webp`
- `Past_work_webp/SteelTech Conduit Room.webp`
- `Past_work_webp/Switch Gear.webp`
- `Past_work_webp/TopTierElectrical_Logo_Web_600w.webp`
- `Past_work_webp/TopTierElectrical_OpenGraph_1200x630.webp`
- `Past_work_webp/Transformer.webp`
- `Past_work_webp/What not to do/Electrical Fail.webp`
- `Past_work_webp/What not to do/Electrical Mess.webp`
- `Past_work_webp/What not to do/IMG_0099.webp`
- `Past_work_webp/What not to do/IMG_2522.webp`
- `Past_work_webp/What not to do/IMG_3108.webp`
- `Past_work_webp/What not to do/IMG_6894.webp`
- `Past_work_webp/What not to do/IMG_8175.webp`
- `Past_work_webp/Working through the Storms.webp`
- `Past_work_webp/backup Generator.webp`
- `Past_work_webp/on site Service Sketch.webp`
- `Past_work_webp/panel.webp`
- `TopTier_Implementation_Guide-01.jpg`
- `TopTier_Implementation_Guide-02.jpg`
- `TopTier_Implementation_Guide-03.jpg`
- `TopTier_Implementation_Guide-04.jpg`
- `TopTier_Implementation_Guide-05.jpg`
- `TopTier_Implementation_Guide-06.jpg`
- `TopTier_Implementation_Guide-07.jpg`
- `TopTier_Implementation_Guide-08.jpg`
- `TopTier_Implementation_Guide-09.jpg`
- `TopTier_Implementation_Guide-10.jpg`
- `TopTier_Implementation_Guide-11.jpg`
- `TopTier_Implementation_Guide-12.jpg`
- `TopTier_Implementation_Guide-13.jpg`
- `TopTier_Implementation_Guide-14.jpg`
- `TopTier_Implementation_Guide-15.jpg`
- `TopTier_Implementation_Guide-16.jpg`
- `TopTier_Implementation_Guide-17.jpg`
- `TopTier_Implementation_Guide-18.jpg`
- `TopTier_Implementation_Guide-19.jpg`
- `TopTier_Implementation_Guide-20.jpg`
- `TopTier_Implementation_Guide-21.jpg`
- `TopTier_Implementation_Guide-22.jpg`
- `TopTier_Implementation_Guide-23.jpg`
- `assets/images/TopTierElectrical_logo_gold_qb_transparent.png`
- `assets/images/hero-original.jpg`
- `assets/images/hero.jpg`
- `assets/images/logos/TopTierElectrical_Primary_Black_2048.png`
- `assets/images/logos/TopTierElectrical_Primary_FlatGold_2048.png`
- `assets/images/logos/TopTierElectrical_Primary_FlatGold_4096.png`
- `assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png`
- `assets/images/logos/TopTierElectrical_Primary_White_2048.png`
- `assets/images/logos/TopTierElectrical_Primary_White_512.png`
- `assets/images/projects/3-phase-service.jpg`
- `assets/images/projects/480v-3-phase.jpg`
- `assets/images/projects/barn-photo.jpg`
- `assets/images/projects/carl.jpg`
- `assets/images/projects/commercial-control-panel-wiring.jpg`
- `assets/images/projects/conduit-piping.jpg`
- `assets/images/projects/conduit.jpg`
- `assets/images/projects/control-cabinet-2.jpg`
- `assets/images/projects/control-cabinet.jpg`
- `assets/images/projects/control-work.jpg`
- `assets/images/projects/dust-collector-motor.jpg`
- `assets/images/projects/dust-collector-system.jpg`
- `assets/images/projects/electrical-project-49-1200.jpg`
- `assets/images/projects/fire-response-2.jpg`
- `assets/images/projects/gas-station-service.jpg`
- `assets/images/projects/generator-transfer-switch-install.jpg`
- `assets/images/projects/horse-stall-lighting.jpg`
- `assets/images/projects/kitchen-led.jpg`
- `assets/images/projects/led-handrail-4.jpg`
- `assets/images/projects/led-handrail-5.jpg`
- `assets/images/projects/led-handrail.jpg`
- `assets/images/projects/led-shelfs.jpg`
- `assets/images/projects/led-shelves.jpg`
- `assets/images/projects/logo.jpg`
- `assets/images/projects/motor-control.jpg`
- `assets/images/projects/motor.jpg`
- `assets/images/projects/myenergi-4SyUf9MvWjU-unsplash.jpg`
- `assets/images/projects/panel-work.jpg`
- `assets/images/projects/pipe-rack.jpg`
- `assets/images/projects/piping.jpg`
- `assets/images/projects/selenoids.jpg`
- `assets/images/projects/service-after.jpg`
- `assets/images/projects/service-panel-upgrade-detail.jpg`
- `assets/images/projects/service-upgrade-before.jpg`
- `assets/images/projects/storm-emergency.jpg`
- `assets/images/projects/transformer.jpg`
- `img-0733-69955aad77cc2.webp`
- `owner_friendly_with_dog_800.webp`
- `switch-gear-69955ab06fdb5.webp`

### Non-UTF8 files

- `IMG_1183_Original.jpg`
- `IMG_1335_Original.jpg`
- `IMG_1380_Original.jpg`
- `IMG_1805_Original.jpg`
- `IMG_3053_Original.jpg`
- `Past_work_webp/3 PHase Service.webp`
- `Past_work_webp/7550693456474594645.webp`
- `Past_work_webp/After me.webp`
- `Past_work_webp/Air Compressor.webp`
- `Past_work_webp/Barn.webp`
- `Past_work_webp/Before me.webp`
- `Past_work_webp/Blower Motor.webp`
- `Past_work_webp/CT CABINET Service upgrade.webp`
- `Past_work_webp/Conduit Piping.webp`
- `Past_work_webp/Conduit.webp`
- `Past_work_webp/Control Cabinet.webp`
- `Past_work_webp/Control Work.webp`
- `Past_work_webp/Counter Bar Lighting.webp`
- `Past_work_webp/Dust Collector System.webp`
- `Past_work_webp/Dust Collector motor.webp`
- `Past_work_webp/EMT Piping.webp`
- `Past_work_webp/Electrical Panels.webp`
- `Past_work_webp/Exterior Light Fixtures.webp`
- `Past_work_webp/Field Controls.webp`
- `Past_work_webp/Fire Response.webp`
- `Past_work_webp/Gas Station Service Call .webp`
- `Past_work_webp/Horse Barn.webp`
- `Past_work_webp/Horse Stall Lighting.webp`
- `Past_work_webp/IMG_0733.webp`
- `Past_work_webp/IMG_0852.webp`
- `Past_work_webp/IMG_1380.webp`
- `Past_work_webp/IMG_1599_Original.webp`
- `Past_work_webp/IMG_8814.webp`
- `Past_work_webp/Interior LED lighitng.webp`
- `Past_work_webp/LED Hand Rail.webp`
- `Past_work_webp/LED HandRail.webp`
- `Past_work_webp/LED shelves.webp`
- `Past_work_webp/LOGO.webp`
- `Past_work_webp/Light Fixture.webp`
- `Past_work_webp/Lighting Fixture.webp`
- `Past_work_webp/Lighting.webp`
- `Past_work_webp/Low Voltage LED.webp`
- `Past_work_webp/Meter Socket Bank.webp`
- `Past_work_webp/Motor Control.webp`
- `Past_work_webp/Motor.webp`
- `Past_work_webp/Multi panel Assembly.webp`
- `Past_work_webp/Panel Work.webp`
- `Past_work_webp/Piping (2).webp`
- `Past_work_webp/Piping.webp`
- `Past_work_webp/Residential Electrical.webp`
- `Past_work_webp/Residential Panel.webp`
- `Past_work_webp/Residential Wiring.webp`
- `Past_work_webp/Residential panel  work.webp`
- `Past_work_webp/Selenoids.webp`
- `Past_work_webp/Service after.webp`
- `Past_work_webp/Service before.webp`
- `Past_work_webp/SteelTech Conduit Room.webp`
- `Past_work_webp/Switch Gear.webp`
- `Past_work_webp/TopTierElectrical_Logo_Web_600w.webp`
- `Past_work_webp/TopTierElectrical_OpenGraph_1200x630.webp`
- `Past_work_webp/Transformer.webp`
- `Past_work_webp/What not to do/Electrical Fail.webp`
- `Past_work_webp/What not to do/Electrical Mess.webp`
- `Past_work_webp/What not to do/IMG_0099.webp`
- `Past_work_webp/What not to do/IMG_2522.webp`
- `Past_work_webp/What not to do/IMG_3108.webp`
- `Past_work_webp/What not to do/IMG_6894.webp`
- `Past_work_webp/What not to do/IMG_8175.webp`
- `Past_work_webp/Working through the Storms.webp`
- `Past_work_webp/backup Generator.webp`
- `Past_work_webp/on site Service Sketch.webp`
- `Past_work_webp/panel.webp`
- `TopTier_Implementation_Guide-01.jpg`
- `TopTier_Implementation_Guide-02.jpg`
- `TopTier_Implementation_Guide-03.jpg`
- `TopTier_Implementation_Guide-04.jpg`
- `TopTier_Implementation_Guide-05.jpg`
- `TopTier_Implementation_Guide-06.jpg`
- `TopTier_Implementation_Guide-07.jpg`
- `TopTier_Implementation_Guide-08.jpg`
- `TopTier_Implementation_Guide-09.jpg`
- `TopTier_Implementation_Guide-10.jpg`
- `TopTier_Implementation_Guide-11.jpg`
- `TopTier_Implementation_Guide-12.jpg`
- `TopTier_Implementation_Guide-13.jpg`
- `TopTier_Implementation_Guide-14.jpg`
- `TopTier_Implementation_Guide-15.jpg`
- `TopTier_Implementation_Guide-16.jpg`
- `TopTier_Implementation_Guide-17.jpg`
- `TopTier_Implementation_Guide-18.jpg`
- `TopTier_Implementation_Guide-19.jpg`
- `TopTier_Implementation_Guide-20.jpg`
- `TopTier_Implementation_Guide-21.jpg`
- `TopTier_Implementation_Guide-22.jpg`
- `TopTier_Implementation_Guide-23.jpg`
- `assets/images/TopTierElectrical_logo_gold_qb_transparent.png`
- `assets/images/hero-original.jpg`
- `assets/images/hero.jpg`
- `assets/images/logos/TopTierElectrical_Primary_Black_2048.png`
- `assets/images/logos/TopTierElectrical_Primary_FlatGold_2048.png`
- `assets/images/logos/TopTierElectrical_Primary_FlatGold_4096.png`
- `assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png`
- `assets/images/logos/TopTierElectrical_Primary_White_2048.png`
- `assets/images/logos/TopTierElectrical_Primary_White_512.png`
- `assets/images/projects/3-phase-service.jpg`
- `assets/images/projects/480v-3-phase.jpg`
- `assets/images/projects/barn-photo.jpg`
- `assets/images/projects/carl.jpg`
- `assets/images/projects/commercial-control-panel-wiring.jpg`
- `assets/images/projects/conduit-piping.jpg`
- `assets/images/projects/conduit.jpg`
- `assets/images/projects/control-cabinet-2.jpg`
- `assets/images/projects/control-cabinet.jpg`
- `assets/images/projects/control-work.jpg`
- `assets/images/projects/dust-collector-motor.jpg`
- `assets/images/projects/dust-collector-system.jpg`
- `assets/images/projects/electrical-project-49-1200.jpg`
- `assets/images/projects/fire-response-2.jpg`
- `assets/images/projects/gas-station-service.jpg`
- `assets/images/projects/generator-transfer-switch-install.jpg`
- `assets/images/projects/horse-stall-lighting.jpg`
- `assets/images/projects/kitchen-led.jpg`
- `assets/images/projects/led-handrail-4.jpg`
- `assets/images/projects/led-handrail-5.jpg`
- `assets/images/projects/led-handrail.jpg`
- `assets/images/projects/led-shelfs.jpg`
- `assets/images/projects/led-shelves.jpg`
- `assets/images/projects/logo.jpg`
- `assets/images/projects/motor-control.jpg`
- `assets/images/projects/motor.jpg`
- `assets/images/projects/myenergi-4SyUf9MvWjU-unsplash.jpg`
- `assets/images/projects/panel-work.jpg`
- `assets/images/projects/pipe-rack.jpg`
- `assets/images/projects/piping.jpg`
- `assets/images/projects/selenoids.jpg`
- `assets/images/projects/service-after.jpg`
- `assets/images/projects/service-panel-upgrade-detail.jpg`
- `assets/images/projects/service-upgrade-before.jpg`
- `assets/images/projects/storm-emergency.jpg`
- `assets/images/projects/transformer.jpg`
- `img-0733-69955aad77cc2.webp`
- `owner_friendly_with_dog_800.webp`
- `switch-gear-69955ab06fdb5.webp`

### Mixed newline files

- `IMG_1183_Original.jpg`
- `IMG_1335_Original.jpg`
- `IMG_1380_Original.jpg`
- `IMG_1805_Original.jpg`
- `IMG_3053_Original.jpg`
- `Past_work_webp/3 PHase Service.webp`
- `Past_work_webp/Air Compressor.webp`
- `Past_work_webp/Barn.webp`
- `Past_work_webp/Blower Motor.webp`
- `Past_work_webp/Conduit Piping.webp`
- `Past_work_webp/Conduit.webp`
- `Past_work_webp/Control Cabinet.webp`
- `Past_work_webp/Counter Bar Lighting.webp`
- `Past_work_webp/Dust Collector System.webp`
- `Past_work_webp/Dust Collector motor.webp`
- `Past_work_webp/EMT Piping.webp`
- `Past_work_webp/Electrical Panels.webp`
- `Past_work_webp/Exterior Light Fixtures.webp`
- `Past_work_webp/Field Controls.webp`
- `Past_work_webp/Fire Response.webp`
- `Past_work_webp/Gas Station Service Call .webp`
- `Past_work_webp/Horse Barn.webp`
- `Past_work_webp/Horse Stall Lighting.webp`
- `Past_work_webp/IMG_1380.webp`
- `Past_work_webp/IMG_1599_Original.webp`
- `Past_work_webp/IMG_8814.webp`
- `Past_work_webp/Interior LED lighitng.webp`
- `Past_work_webp/LED Hand Rail.webp`
- `Past_work_webp/LED HandRail.webp`
- `Past_work_webp/LED shelves.webp`
- `Past_work_webp/LOGO.webp`
- `Past_work_webp/Light Fixture.webp`
- `Past_work_webp/Lighting Fixture.webp`
- `Past_work_webp/Lighting.webp`
- `Past_work_webp/Meter Socket Bank.webp`
- `Past_work_webp/Motor Control.webp`
- `Past_work_webp/Motor.webp`
- `Past_work_webp/Multi panel Assembly.webp`
- `Past_work_webp/Panel Work.webp`
- `Past_work_webp/Piping (2).webp`
- `Past_work_webp/Piping.webp`
- `Past_work_webp/Residential Electrical.webp`
- `Past_work_webp/Residential Panel.webp`
- `Past_work_webp/Residential Wiring.webp`
- `Past_work_webp/Residential panel  work.webp`
- `Past_work_webp/Selenoids.webp`
- `Past_work_webp/Service after.webp`
- `Past_work_webp/Service before.webp`
- `Past_work_webp/SteelTech Conduit Room.webp`
- `Past_work_webp/Switch Gear.webp`
- `Past_work_webp/TopTierElectrical_Logo_Web_600w.webp`
- `Past_work_webp/TopTierElectrical_OpenGraph_1200x630.webp`
- `Past_work_webp/Transformer.webp`
- `Past_work_webp/What not to do/Electrical Fail.webp`
- `Past_work_webp/What not to do/Electrical Mess.webp`
- `Past_work_webp/Working through the Storms.webp`
- `Past_work_webp/backup Generator.webp`
- `Past_work_webp/on site Service Sketch.webp`
- `TopTier_Implementation_Guide-01.jpg`
- `TopTier_Implementation_Guide-03.jpg`
- `TopTier_Implementation_Guide-04.jpg`
- `TopTier_Implementation_Guide-05.jpg`
- `TopTier_Implementation_Guide-06.jpg`
- `TopTier_Implementation_Guide-08.jpg`
- `TopTier_Implementation_Guide-09.jpg`
- `TopTier_Implementation_Guide-11.jpg`
- `TopTier_Implementation_Guide-12.jpg`
- `TopTier_Implementation_Guide-13.jpg`
- `TopTier_Implementation_Guide-14.jpg`
- `TopTier_Implementation_Guide-15.jpg`
- `TopTier_Implementation_Guide-16.jpg`
- `TopTier_Implementation_Guide-18.jpg`
- `TopTier_Implementation_Guide-19.jpg`
- `TopTier_Implementation_Guide-20.jpg`
- `TopTier_Implementation_Guide-22.jpg`
- `TopTier_Implementation_Guide-23.jpg`
- `assets/images/TopTierElectrical_logo_gold_qb_transparent.png`
- `assets/images/hero-original.jpg`
- `assets/images/hero.jpg`
- `assets/images/logos/TopTierElectrical_Primary_Black_2048.png`
- `assets/images/logos/TopTierElectrical_Primary_FlatGold_2048.png`
- `assets/images/logos/TopTierElectrical_Primary_FlatGold_4096.png`
- `assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png`
- `assets/images/logos/TopTierElectrical_Primary_White_2048.png`
- `assets/images/logos/TopTierElectrical_Primary_White_512.png`
- `assets/images/projects/3-phase-service.jpg`
- `assets/images/projects/480v-3-phase.jpg`
- `assets/images/projects/barn-photo.jpg`
- `assets/images/projects/commercial-control-panel-wiring.jpg`
- `assets/images/projects/conduit-piping.jpg`
- `assets/images/projects/conduit.jpg`
- `assets/images/projects/control-cabinet-2.jpg`
- `assets/images/projects/control-cabinet.jpg`
- `assets/images/projects/control-work.jpg`
- `assets/images/projects/dust-collector-motor.jpg`
- `assets/images/projects/dust-collector-system.jpg`
- `assets/images/projects/electrical-project-49-1200.jpg`
- `assets/images/projects/fire-response-2.jpg`
- `assets/images/projects/gas-station-service.jpg`
- `assets/images/projects/generator-transfer-switch-install.jpg`
- `assets/images/projects/horse-stall-lighting.jpg`
- `assets/images/projects/kitchen-led.jpg`
- `assets/images/projects/led-handrail-4.jpg`
- `assets/images/projects/led-handrail-5.jpg`
- `assets/images/projects/led-handrail.jpg`
- `assets/images/projects/led-shelfs.jpg`
- `assets/images/projects/led-shelves.jpg`
- `assets/images/projects/motor-control.jpg`
- `assets/images/projects/motor.jpg`
- `assets/images/projects/myenergi-4SyUf9MvWjU-unsplash.jpg`
- `assets/images/projects/panel-work.jpg`
- `assets/images/projects/pipe-rack.jpg`
- `assets/images/projects/piping.jpg`
- `assets/images/projects/selenoids.jpg`
- `assets/images/projects/service-after.jpg`
- `assets/images/projects/service-panel-upgrade-detail.jpg`
- `assets/images/projects/service-upgrade-before.jpg`
- `assets/images/projects/storm-emergency.jpg`
- `assets/images/projects/transformer.jpg`

## Duplicate Content (exact SHA-256 matches)

- Duplicate hash groups: **2**

- `2d838b50f4406eaf345588522712edae5159592fc924c7ba74def240a28b8087` (2 files, 1343 bytes each)
  - `local-seo/gbp-profile.example.json`
  - `local-seo/gbp-profile.json`
- `75667f85d53786f8b08151a1efcdd24aaee06d678e408fcec99704f58e3f01a6` (2 files, 515 bytes each)
  - `local-seo/citations.example.json`
  - `local-seo/citations.json`

## Largest Tracked Files (top 20)

| Path                                                              |     Bytes | SHA-256 (first 16) |
| ----------------------------------------------------------------- | --------: | ------------------ |
| `assets/images/projects/gas-station-service.jpg`                  | 4,674,447 | `5c1d63e95f75d271` |
| `assets/images/projects/panel-work.jpg`                           | 2,699,241 | `42bbb0f1a7d625fc` |
| `assets/images/projects/motor-control.jpg`                        | 2,428,905 | `c8f0c08d7ee63c47` |
| `assets/images/projects/horse-stall-lighting.jpg`                 | 2,417,036 | `a6e1499830cd46e1` |
| `assets/images/hero-original.jpg`                                 | 2,352,663 | `6bc0a3eae374d985` |
| `assets/images/projects/led-handrail-5.jpg`                       | 1,468,371 | `e03b3af6c56d8249` |
| `assets/images/projects/led-handrail-4.jpg`                       | 1,427,891 | `6ce6a042670106ec` |
| `assets/images/logos/TopTierElectrical_Primary_FlatGold_4096.png` | 1,214,175 | `46d00ae655e82c8d` |
| `assets/images/projects/barn-photo.jpg`                           |   946,367 | `5a9a972e2076b073` |
| `assets/images/projects/service-panel-upgrade-detail.jpg`         |   934,140 | `2052c64eb3bec5dd` |
| `Past_work_webp/Blower Motor.webp`                                |   732,406 | `41153f7a81cf457b` |
| `assets/images/projects/generator-transfer-switch-install.jpg`    |   731,211 | `d2aa4e9faaa22dae` |
| `assets/images/projects/480v-3-phase.jpg`                         |   708,425 | `6f2d9efda87bfc54` |
| `assets/images/projects/commercial-control-panel-wiring.jpg`      |   689,334 | `2397af7e2df07cf8` |
| `Past_work_webp/IMG_1599_Original.webp`                           |   684,932 | `6aa5a8a7cfdc366c` |
| `Past_work_webp/What not to do/Electrical Mess.webp`              |   591,218 | `146cd31df9133a5b` |
| `Past_work_webp/EMT Piping.webp`                                  |   481,426 | `1f9c420f90559231` |
| `assets/images/projects/fire-response-2.jpg`                      |   478,187 | `e18909d4fc2c281b` |
| `Past_work_webp/Lighting Fixture.webp`                            |   458,306 | `621daedbebaef172` |
| `assets/images/projects/dust-collector-system.jpg`                |   443,067 | `d675fe005c2310da` |

## File Type Distribution

| Extension  | Files | Total bytes |
| ---------- | ----: | ----------: |
| `.md`      |    94 |     380,061 |
| `.html`    |    84 |     596,312 |
| `.webp`    |    70 |  14,450,092 |
| `.jpg`     |    66 |  33,254,137 |
| `.mjs`     |    27 |      70,721 |
| `.ts`      |    24 |      64,103 |
| `.json`    |    13 |     175,648 |
| `.txt`     |    12 |      17,058 |
| `.tsx`     |    12 |      12,743 |
| `.yml`     |     9 |      14,205 |
| `.js`      |     9 |      34,884 |
| `<noext>`  |     7 |       3,415 |
| `.png`     |     7 |   2,889,582 |
| `.csv`     |     6 |      34,327 |
| `.css`     |     4 |      49,780 |
| `.sh`      |     4 |      31,255 |
| `.example` |     1 |         251 |
| `.svg`     |     1 |         204 |
| `.xml`     |     1 |       5,654 |
| `.py`      |     1 |       5,426 |
| `.jsonc`   |     1 |         217 |
| `.toml`    |     1 |         129 |
