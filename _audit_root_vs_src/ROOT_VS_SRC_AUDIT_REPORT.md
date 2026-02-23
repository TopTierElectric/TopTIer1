# ROOT_VS_SRC_AUDIT_REPORT

## A. Executive summary

- Exact layer counts from `pairing.tsv`: IDENTICAL=0, CHANGED=0, MISSING_IN_SRC=387, EXTRA_IN_SRC=70.
- Heuristic layer counts from `fuzzy_pairing.tsv`: total_candidates=23.

Top 10 highest-score fuzzy candidates (or fewer if unavailable):
1. `testimonials.html` → `pages/testimonials.html` | score=1.2811 | evidence: `fuzzy_diffs/testimonials.html__TO__pages_testimonials.html.diff`, `fuzzy_byte_diffs/testimonials.html__TO__pages_testimonials.html.cmp.txt`.
2. `residential.html` → `pages/residential.html` | score=0.6272 | evidence: `fuzzy_diffs/residential.html__TO__pages_residential.html.diff`, `fuzzy_byte_diffs/residential.html__TO__pages_residential.html.cmp.txt`.
3. `commercial.html` → `pages/commercial.html` | score=0.5799 | evidence: `fuzzy_diffs/commercial.html__TO__pages_commercial.html.diff`, `fuzzy_byte_diffs/commercial.html__TO__pages_commercial.html.cmp.txt`.
4. `thank-you.html` → `pages/thank-you.html` | score=0.5343 | evidence: `fuzzy_diffs/thank-you.html__TO__pages_thank-you.html.diff`, `fuzzy_byte_diffs/thank-you.html__TO__pages_thank-you.html.cmp.txt`.
5. `about.html` → `pages/about.html` | score=0.5122 | evidence: `fuzzy_diffs/about.html__TO__pages_about.html.diff`, `fuzzy_byte_diffs/about.html__TO__pages_about.html.cmp.txt`.
6. `financing.html` → `pages/financing.html` | score=0.5057 | evidence: `fuzzy_diffs/financing.html__TO__pages_financing.html.diff`, `fuzzy_byte_diffs/financing.html__TO__pages_financing.html.cmp.txt`.
7. `faq.html` → `pages/faq.html` | score=0.4456 | evidence: `fuzzy_diffs/faq.html__TO__pages_faq.html.diff`, `fuzzy_byte_diffs/faq.html__TO__pages_faq.html.cmp.txt`.
8. `contact.html` → `pages/contact.html` | score=0.4394 | evidence: `fuzzy_diffs/contact.html__TO__pages_contact.html.diff`, `fuzzy_byte_diffs/contact.html__TO__pages_contact.html.cmp.txt`.
9. `generators.html` → `pages/generators.html` | score=0.4379 | evidence: `fuzzy_diffs/generators.html__TO__pages_generators.html.diff`, `fuzzy_byte_diffs/generators.html__TO__pages_generators.html.cmp.txt`.
10. `electrician-holland.html` → `pages/electrician-holland.html` | score=0.4373 | evidence: `fuzzy_diffs/electrician-holland.html__TO__pages_electrician-holland.html.diff`, `fuzzy_byte_diffs/electrician-holland.html__TO__pages_electrician-holland.html.cmp.txt`.

Highest-impact ROOT→SRC transplant items (top 10):
1. `.github/workflows/deploy-prod.yml` — evidence: needs manual confirmation.
2. `.github/workflows/deploy-cloudflare-pages.yml` — evidence: needs manual confirmation.
3. `.github/workflows/quality-gates.yml` — evidence: needs manual confirmation.
4. `wrangler.toml` — evidence: needs manual confirmation.
5. `wrangler.jsonc` — evidence: needs manual confirmation.
6. `_headers` — evidence: needs manual confirmation.
7. `_redirects` — evidence: needs manual confirmation.
8. `.well-known/security.txt` — evidence: needs manual confirmation.
9. `app/api/leads/route.ts` — evidence: needs manual confirmation.
10. `scripts/seo-quality-gates.mjs` — evidence: needs manual confirmation.

## B. File-by-file audit (sorted)

### B.1 Exact per-relpath verification record
`pairing.tsv` is the canonical truth source for exact-path pairing.
Column interpretation: `status | relpath | root_sha | src_sha | root_size | src_size`.

| status | relpath | root_sha | src_sha | root_size | src_size |
|---|---|---|---|---:|---:|
| MISSING_IN_SRC | `.env.example` | `5594ecc1830310506f7d6336dc2600cc6226769b616c96fb9dadbfa5dd2a93c8` | `—` | 251 | — |
| MISSING_IN_SRC | `.github/workflows/ci.yml` | `6fce4161e74078261fc964e234ad6bd5f637af92d25a11ccaff8c88dff49a4a9` | `—` | 2462 | — |
| MISSING_IN_SRC | `.github/workflows/deploy-cloudflare-pages.yml` | `b7489b7d3dbf945633364e6329450ad28f674f6300201d1405e102a4193eb18b` | `—` | 2198 | — |
| MISSING_IN_SRC | `.github/workflows/deploy-prod.yml` | `60c036b76c7c3d19891d8852c8968db97df0882e9d5a1952c09b088bf62c9887` | `—` | 3234 | — |
| MISSING_IN_SRC | `.github/workflows/format-with-prettier.yml` | `88c9d8a207a20cb93e26b2e4ff40eca8cd108e4a3caf06d40bd8a4b68af1b6d1` | `—` | 1161 | — |
| MISSING_IN_SRC | `.github/workflows/qa.yml` | `5592f07cd033182215a4eaa3358b6804951d74023490a01a2c202735428fe31f` | `—` | 2879 | — |
| MISSING_IN_SRC | `.github/workflows/quality-gates.yml` | `c9fe08b8e641025b64b8e47af77e0acfaf5a6adfa4e60622c4b6574dbbf0549c` | `—` | 1125 | — |
| MISSING_IN_SRC | `.github/workflows/quality.yml` | `d79d6fd27b90a9b0784393fec1253010965daebbe57714df0e4a3d9f7602fe0d` | `—` | 295 | — |
| MISSING_IN_SRC | `.gitignore` | `3db2f200c5d78738d9a0a17bc9dfbc31ec384d70f87a951d1f5a17d9f4bc7edb` | `—` | 301 | — |
| MISSING_IN_SRC | `.htmlvalidate.json` | `7a2d18eec81b6ad3da810464379614dea3f699aee679f9be0b05a4e6fedd8cb9` | `—` | 203 | — |
| MISSING_IN_SRC | `.pa11yci` | `a95a7a2ff465d639b13336699884ad207a5f1f3f688929dd3e37a62cac88d613` | `—` | 391 | — |
| MISSING_IN_SRC | `.prettierignore` | `f5e85cfb7f45753f4d7ef1102d779dae464329c0b888350da8a41d77dc12d066` | `—` | 35 | — |
| MISSING_IN_SRC | `.stylelintrc.json` | `e6ef821ae5a08d1cd14ee7ac71428fdc5ff7ddeb1e88132897bec69171899e4f` | `—` | 45 | — |
| MISSING_IN_SRC | `.well-known/security.txt` | `0bcfaa50c0fef577d8c00bf4e9cc7ef9a449adadf47fc8cd1966715a99c180ed` | `—` | 121 | — |
| MISSING_IN_SRC | `404.html` | `4e320d8224ec7523ba7a5e763aa9c0b169b41dcc1404f2d3fd18ade1b6fbf7d6` | `—` | 9199 | — |
| MISSING_IN_SRC | `AUDIT.md` | `103fe4cd250dee2f552729d60432757a5440efd444230241be2b82517e310569` | `—` | 2414 | — |
| MISSING_IN_SRC | `FINAL_VERIFICATION_PLAYBOOK.md` | `8ead68bd2a4f84807fc549356ee811198c48a9d937573b8904e932cfff7fdfbe` | `—` | 1685 | — |
| MISSING_IN_SRC | `IMG_1183_Original.jpg` | `97fa479bc6c4e6eef1ca55840eae968fe472e2fa62d71df91150086777f724c9` | `—` | 13176 | — |
| MISSING_IN_SRC | `IMG_1335_Original.jpg` | `146c5ff68cd618b22b58a0de3b36fa738103560e6b7669faa1dcc13773b29fd6` | `—` | 181870 | — |
| MISSING_IN_SRC | `IMG_1380_Original.jpg` | `aa3c6fce794bb2728cc77aec13ed7060b4278c5bfa91541de86c76c37af756f8` | `—` | 22797 | — |
| MISSING_IN_SRC | `IMG_1805_Original.jpg` | `772798ccf0168c3192a1fe004a7552c71796c2b7fcbedc3339b0048d0549e7e4` | `—` | 158465 | — |
| MISSING_IN_SRC | `IMG_3053_Original.jpg` | `be65764c08b2b7ffefb69045d450c6bfebd978c02d55092d90c7b94fe0b48b42` | `—` | 193156 | — |
| MISSING_IN_SRC | `PROMPT_BLOG_SITE_IMPLEMENTATION.md` | `9f057248bb28884d7fca42a3578717778d4f3d44c3b76961e02f38e6189cdeb2` | `—` | 3465 | — |
| MISSING_IN_SRC | `Past_work_webp/3 PHase Service.webp` | `c85d174e14da7ba465472e5ff42e908588edfe59fe6cab11bb59cf1d8ee5e2b0` | `—` | 29906 | — |
| MISSING_IN_SRC | `Past_work_webp/7550693456474594645.webp` | `c3ef61e27eb29fa430f4edf92f29a177bd5b9397c57f4fef8d81ab1ae91d111f` | `—` | 339712 | — |
| MISSING_IN_SRC | `Past_work_webp/After me.webp` | `58bfc3608100d8e435322ada9c164513ba441c41bf7ece2948b8b337e0036a07` | `—` | 77044 | — |
| MISSING_IN_SRC | `Past_work_webp/Air Compressor.webp` | `2fd3d71509cf0b636027201d6daf5318d05ab298a455f6d7e80b7caa6233bac5` | `—` | 176636 | — |
| MISSING_IN_SRC | `Past_work_webp/Barn.webp` | `be6c06a6f74fb813d1bc1be23befb8981555bc319e0b132aca411c22d3d16e87` | `—` | 331814 | — |
| MISSING_IN_SRC | `Past_work_webp/Before me.webp` | `f835e6588e7368d5801c9c2e4d5e19f200b16f292183b0306bc0c35372376d97` | `—` | 11540 | — |
| MISSING_IN_SRC | `Past_work_webp/Blower Motor.webp` | `41153f7a81cf457b1aa200cb976a7822f70527c3585c77e0151ad94dbd0a640b` | `—` | 732406 | — |
| MISSING_IN_SRC | `Past_work_webp/CT CABINET Service upgrade.webp` | `3c2cb87378d8c5c560b97ee55e1df4e4ec0a8850a19fd84082fc6f556b6de42f` | `—` | 12978 | — |
| MISSING_IN_SRC | `Past_work_webp/Conduit Piping.webp` | `636757b7f7125d7e0b7051dbbe103119c2015732651a2fa11ec4bc6978bfc220` | `—` | 94212 | — |
| MISSING_IN_SRC | `Past_work_webp/Conduit.webp` | `bf2a6b6f0e1ac6ea6187799050697cec5f731d97e7ef4da3132e3c2c657a81ee` | `—` | 131356 | — |
| MISSING_IN_SRC | `Past_work_webp/Control Cabinet.webp` | `ce8a4e981c0f0d5f31cad3d9128e9203af628e52b6c09d469890638fad86436a` | `—` | 430296 | — |
| MISSING_IN_SRC | `Past_work_webp/Control Work.webp` | `ecb6dc07b1424930574d2e54b57e31fff2b429e8c1c36e4b93d2890039c8b3ed` | `—` | 53036 | — |
| MISSING_IN_SRC | `Past_work_webp/Counter Bar Lighting.webp` | `38d04a475851d3851e728c32e2111916736ac78f53a1b4fa03da6a4ab9a40c44` | `—` | 90702 | — |
| MISSING_IN_SRC | `Past_work_webp/Dust Collector System.webp` | `488fa79f5d951641619b045446ba8c84a50d75d4d178a982776fcf8671794c1c` | `—` | 178458 | — |
| MISSING_IN_SRC | `Past_work_webp/Dust Collector motor.webp` | `8cdc26963ed69444d0edef4bc3cd5ca04c02da712a97b546f6fa2d66960da6c3` | `—` | 150354 | — |
| MISSING_IN_SRC | `Past_work_webp/EMT Piping.webp` | `1f9c420f9055923170981170a83f9e196e720dbf30abcb7cb0dea9e3e0ceac03` | `—` | 481426 | — |
| MISSING_IN_SRC | `Past_work_webp/Electrical Panels.webp` | `0501337b902ddaca12656e238d9ee32efaf907dde25a1fdceeb7dc7717845660` | `—` | 113858 | — |
| MISSING_IN_SRC | `Past_work_webp/Exterior Light Fixtures.webp` | `cd0f2a791579ef29cc66c8ed01ac7d5312fbc7a17890c32e0c8dc753a7c7058c` | `—` | 325554 | — |
| MISSING_IN_SRC | `Past_work_webp/Field Controls.webp` | `676afcbfcde7b8a2f39f5cb11c41003fef88944d187ac819cbace9be0605bdfd` | `—` | 294728 | — |
| MISSING_IN_SRC | `Past_work_webp/Fire Response.webp` | `003cd099d4ee8fefe989ba5d3075d77c4acb4992cf09581a5112739dde5a7f97` | `—` | 191542 | — |
| MISSING_IN_SRC | `Past_work_webp/Gas Station Service Call .webp` | `d64b03360613f6effd476b40c91f916374427bd609fe163f0fc607742c73fc26` | `—` | 410022 | — |
| MISSING_IN_SRC | `Past_work_webp/Horse Barn.webp` | `2faf483af50da72e0c44fc2e817efb638a15beb62ba9ad8a90e0e8bc55c7abd4` | `—` | 392840 | — |
| MISSING_IN_SRC | `Past_work_webp/Horse Stall Lighting.webp` | `85a59723e9e3bffd51c2ba2289dca59fb53e13bda57d716115527f2d04201815` | `—` | 326750 | — |
| MISSING_IN_SRC | `Past_work_webp/IMG_0733.webp` | `0bb7e35de846135097520949414ab9113802ca44dfd281c584d433c597d2d146` | `—` | 26700 | — |
| MISSING_IN_SRC | `Past_work_webp/IMG_0852.webp` | `26814ad9ffee98aedcd4b5a1279c70885dc8f57c7299ca3083a1bcb6b354e39e` | `—` | 13496 | — |
| MISSING_IN_SRC | `Past_work_webp/IMG_1380.webp` | `c53462a66832d12c283b453b3f60bd741d855617b085806b3fbeec3645d50445` | `—` | 305700 | — |
| MISSING_IN_SRC | `Past_work_webp/IMG_1599_Original.webp` | `6aa5a8a7cfdc366cdc65e8c413e533857fce711bc9a6483d76c5302eb5d09965` | `—` | 684932 | — |
| MISSING_IN_SRC | `Past_work_webp/IMG_8814.webp` | `ab7287e2d6db3ddac341cab0f2183600e9fd7a7261454192d18cf223711d2cc5` | `—` | 301786 | — |
| MISSING_IN_SRC | `Past_work_webp/Interior LED lighitng.webp` | `541e79da087776fb1506ca6944df63c2a1ceab2f5ee2f120f1e0c681c39b3960` | `—` | 269720 | — |
| MISSING_IN_SRC | `Past_work_webp/LED Hand Rail.webp` | `fdfc6186acf3557a91b1bb96021bb2d3d55b73d6ec295118f62b43ecf797b8c5` | `—` | 96392 | — |
| MISSING_IN_SRC | `Past_work_webp/LED HandRail.webp` | `c7dc5f30dc4319d7bc144e9e2effcaf5967b312dde2d57b23a695c3c2ca8da28` | `—` | 121462 | — |
| MISSING_IN_SRC | `Past_work_webp/LED shelves.webp` | `07c15175e7ba5ee86b4345470721235bc3734853cf4632f86bf00bb302255994` | `—` | 34908 | — |
| MISSING_IN_SRC | `Past_work_webp/LOGO.webp` | `c343bba59502d6e6bbd33d27998c33fc3679910b6f8d206ae35874b0567055b6` | `—` | 31640 | — |
| MISSING_IN_SRC | `Past_work_webp/Light Fixture.webp` | `561c0047ac68c2367e6678f3632bb9467dc1c343213bf7ad94f1179b4790d2c9` | `—` | 287372 | — |
| MISSING_IN_SRC | `Past_work_webp/Lighting Fixture.webp` | `621daedbebaef1726be155d2ced508ad1fb7371f9be7d90d08a6eb5b12d8bf45` | `—` | 458306 | — |
| MISSING_IN_SRC | `Past_work_webp/Lighting.webp` | `6e8d9cddc256f41a96f12b938928141bc69f18aedf2ceb8a1975e92053cb20d8` | `—` | 102092 | — |
| MISSING_IN_SRC | `Past_work_webp/Low Voltage LED.webp` | `c2186dd36c579b13d865cf19dd53299f9150c96d5daf3a5ee3cd265d23626f18` | `—` | 79366 | — |
| MISSING_IN_SRC | `Past_work_webp/Meter Socket Bank.webp` | `5ae79ef2484f866331401e5c18af575cd24e446b53475b1afd1d591689f4d548` | `—` | 252690 | — |
| MISSING_IN_SRC | `Past_work_webp/Motor Control.webp` | `1e89faab33d173a38d6a3dd53b1ce869ee65fe083455dcc8a68d1e84ca1d8876` | `—` | 332036 | — |
| MISSING_IN_SRC | `Past_work_webp/Motor.webp` | `7238c33517f1100eb45aa9863f5ec05b0669b21b806fba1ebe4aa0da1f8d8905` | `—` | 26692 | — |
| MISSING_IN_SRC | `Past_work_webp/Multi panel Assembly.webp` | `378411595dd4186999bad0b505aa1129719e5033d7c03596b795a29c041981b1` | `—` | 230060 | — |
| MISSING_IN_SRC | `Past_work_webp/Panel Work.webp` | `3b95b68257914335a2c02ef75a666df75c7eaf95a7ddb19a8595d5732fd8eeb9` | `—` | 358468 | — |
| MISSING_IN_SRC | `Past_work_webp/Piping (2).webp` | `231f017357a7977251baa526bc92eb235bf9d93fdf71cce914cb4478eb3c30cb` | `—` | 86398 | — |
| MISSING_IN_SRC | `Past_work_webp/Piping.webp` | `b641ac967ebfaa0f89b5fc377340cb90cca017de5f34a9294c6581e2dc4d46ed` | `—` | 87322 | — |
| MISSING_IN_SRC | `Past_work_webp/Residential Electrical.webp` | `6ca476d3e79dd499e63527354c25fe0c9b21e9076e5e9ab1dc7e5be926f05b52` | `—` | 189902 | — |
| MISSING_IN_SRC | `Past_work_webp/Residential Panel.webp` | `a297b2962bd4030dccca3b8c5340d622d9e5727985bf0897133c86606a803ec7` | `—` | 336318 | — |
| MISSING_IN_SRC | `Past_work_webp/Residential Wiring.webp` | `e50a4a7de920327b8ab12b2888ef8c9258efdd20625adc50630e9e6ec3752e07` | `—` | 303390 | — |
| MISSING_IN_SRC | `Past_work_webp/Residential panel  work.webp` | `df0f13d247d34d406eefaa54a608d3ea30318fc26f89612e192ac4b7de43e1b0` | `—` | 102220 | — |
| MISSING_IN_SRC | `Past_work_webp/Selenoids.webp` | `2b6eea9ab6d34842abb02aa2cfb303f122d7e00c5a82c874db7d381d6203068a` | `—` | 109224 | — |
| MISSING_IN_SRC | `Past_work_webp/Service after.webp` | `e67e6f8caa4b9f277f2bed030720f5b01eef4b1f71ec0389170ec6eb0e74eacc` | `—` | 318458 | — |
| MISSING_IN_SRC | `Past_work_webp/Service before.webp` | `286e7eb541f727023961428784853fb15f7980c719d5801de14619693b3f13d6` | `—` | 292962 | — |
| MISSING_IN_SRC | `Past_work_webp/SteelTech Conduit Room.webp` | `13703c6f0ececded4aa4e1a6c6ce91a6029f46d82eaf763da06becebbb0408f2` | `—` | 386824 | — |
| MISSING_IN_SRC | `Past_work_webp/Switch Gear.webp` | `0df14dc2199cf8ff92edc90c44db13802285fb0d8b72ae563b3b36e041388985` | `—` | 6904 | — |
| MISSING_IN_SRC | `Past_work_webp/TopTierElectrical_Logo_Web_600w.webp` | `eece192e7df0692fa28b3663772d5c36f678d6702c1b048ec31f8b6755cd081f` | `—` | 341354 | — |
| MISSING_IN_SRC | `Past_work_webp/TopTierElectrical_OpenGraph_1200x630.webp` | `4dfb568de796e8c48ad2b091cfd16bda20ccdc268b90dbe48166f01c221e28d3` | `—` | 237646 | — |
| MISSING_IN_SRC | `Past_work_webp/Transformer.webp` | `72f54930140fb436ee1ed9936c86da1986488239179eb185afd0eb51b2698db8` | `—` | 396132 | — |
| MISSING_IN_SRC | `Past_work_webp/What not to do/Electrical Fail.webp` | `9f89e9319cfb4b14e564390c629f3603bc04e2c58ee6f6ffb6eb48c1bddf4d0a` | `—` | 275694 | — |
| MISSING_IN_SRC | `Past_work_webp/What not to do/Electrical Mess.webp` | `146cd31df9133a5b2a16ffaddaac8758565b5f2a781e6bab1d015ef8e0a00aca` | `—` | 591218 | — |
| MISSING_IN_SRC | `Past_work_webp/What not to do/IMG_0099.webp` | `d5a2ff3f57a86a5ca6b52b12b2f2140a6932b30db9cc3e82db14cc16409f1e65` | `—` | 12650 | — |
| MISSING_IN_SRC | `Past_work_webp/What not to do/IMG_2522.webp` | `171b35743bb954e94a804fae319836e59a8f71160707e44b55e80b4d9b21b7d4` | `—` | 13650 | — |
| MISSING_IN_SRC | `Past_work_webp/What not to do/IMG_3108.webp` | `5f9644faf36c6a248efd1dbef4d5f3bf953b9efc94ed23a0a8e6ffd41495b5d1` | `—` | 9228 | — |
| MISSING_IN_SRC | `Past_work_webp/What not to do/IMG_6894.webp` | `281466d943f6bb86524b49cd6bb0f4684d5ee32b46548d25df3c14c9a1807801` | `—` | 9994 | — |
| MISSING_IN_SRC | `Past_work_webp/What not to do/IMG_8175.webp` | `8ca1b1ed9d9123396493968ce56eb4d8fc83ee262fb0720392886f93982d2a73` | `—` | 9208 | — |
| MISSING_IN_SRC | `Past_work_webp/Working through the Storms.webp` | `76e8de9cb237fe100a5847ee1e1c0cd792d975f219bd14856edbe1fcda00e146` | `—` | 103702 | — |
| MISSING_IN_SRC | `Past_work_webp/backup Generator.webp` | `79ad09589c889924bffdd1229934720d525f7460c7fd25ffb155668487cb3d2d` | `—` | 276820 | — |
| MISSING_IN_SRC | `Past_work_webp/conversion_report.csv` | `d49d1d0cafae38cfebae8da18ee11522ac65a2fe17265f26b71c96971f70c114` | `—` | 7011 | — |
| MISSING_IN_SRC | `Past_work_webp/conversion_report.json` | `5685021a37879aece6e640856ea8f348bb744cce873c39261ea65b214023a4be` | `—` | 26769 | — |
| MISSING_IN_SRC | `Past_work_webp/index.html` | `bd72f27b0709c6666d2d0a7ff67df53fa26abb9245e2e16e30ef2741f68463e7` | `—` | 27265 | — |
| MISSING_IN_SRC | `Past_work_webp/on site Service Sketch.webp` | `65d176ba120a24afc2aafd92dc76e429f19d6d7cc10075bc4d3bdb35e2517040` | `—` | 351418 | — |
| MISSING_IN_SRC | `Past_work_webp/panel.webp` | `138c33ee577dedcecb3cecfba262042921d8e2b6128ea8d2fed662d47ef2e3a9` | `—` | 81048 | — |
| MISSING_IN_SRC | `README.md` | `33f786ac0718c85e8ba085efd6f0666cc3a32b9a82461cf49bb40c7c3bfffb53` | `—` | 2441 | — |
| MISSING_IN_SRC | `SEO_CONTENT_BACKLOG.md` | `eb98eda0b6a1f67909bfcca158b0e47d441bcd97dfcf211d42233b73cf9a66bb` | `—` | 6114 | — |
| MISSING_IN_SRC | `SEO_CONTENT_CHANGELOG.md` | `56da47e4a97e12aec9b70688dad74225fba95bfbf4cc56e9a14007f6ff61c75d` | `—` | 8169 | — |
| MISSING_IN_SRC | `SEO_CONTENT_TRACKER.md` | `2741b91fec2380b9d415b5fd9bb1eaaa76c2d5a82c4ca16375c0e9aa546387d5` | `—` | 13143 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-01.jpg` | `1202d75a90d439d01e7a6c531f82664654b0bc58af96e60964672a3a5125390c` | `—` | 59117 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-02.jpg` | `4bd4bd71576381057af8d73832f101492a24ee7df13934f888f0eae010a0921b` | `—` | 22683 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-03.jpg` | `3d425aa0748994a547cc212ca679308336018c3b425f4475d9e1210e5ff41012` | `—` | 220413 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-04.jpg` | `47b2a9eb7da60b4fd842338158db07c79c1eaca3c0fed70402a81773eabf6e4c` | `—` | 235253 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-05.jpg` | `a8f7a64daf39b1a5eccdd809e76b5643b5b083bb562ebb02f51726a891f2c738` | `—` | 78050 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-06.jpg` | `32a432ddb20c0d102776208560f6e4bf1b0f2fda653d7ae7b4a99ad07c173393` | `—` | 296905 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-07.jpg` | `f692d00e63f8f146e38c9573e3e10cf695d44c57f32e8f050a058576c6c7a648` | `—` | 68330 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-08.jpg` | `104c79b0f036bc357b15e328ef4dba4c2ce3a16e6d0cec8ded815389e5348465` | `—` | 158304 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-09.jpg` | `f4aa2166f9ae9e1b90361385df9f8b8734cf5b34d3172bd4b8a170f019ce2913` | `—` | 162912 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-10.jpg` | `e98ec42ac516b9ea4a54f870368495ed2d48b403854e22de60fdf8dd4a4bc354` | `—` | 111268 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-11.jpg` | `e8db60dcdb99afb0ae943c2f413f4379a850acad91fceac7b1f08da86cfa47aa` | `—` | 216276 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-12.jpg` | `79734d3b1c2d1fd3aab768b50e3c557399e0a9fa93f51911d57ec19858364892` | `—` | 169944 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-13.jpg` | `15b2a4a50a52f623e656e775267f94bdd4b62d87be23949ace4abf78b0cbdfe4` | `—` | 277513 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-14.jpg` | `9e97862b036226c965d566c30efb281c2750de19da5e42a0f3a33387ee6e2bf3` | `—` | 160701 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-15.jpg` | `c957c8d184d6980282d096d787bcdf05fabac43bc88350f11ac396f0aef3a7a1` | `—` | 176651 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-16.jpg` | `506da78d9dc349163811225be081fad041ebabb434ef66d0998b147b0237764b` | `—` | 107955 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-17.jpg` | `a3d62f39b9010abcccaca4c2f1b8767a7075be551262f70e7ed1599c7eec5db7` | `—` | 63644 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-18.jpg` | `1afac49f02c0a6bbc6d0f8339fc28f98a4e18d14c721e4b72159e4ced1b341c7` | `—` | 253951 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-19.jpg` | `a7abff034b66db7c64b61a44304c47d88acb6353ebfee6c2cdd2e56207dcac3b` | `—` | 38859 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-20.jpg` | `f0eedb63c1e11669f6018359600d744b9ae53c79b5326324377ca6b7dfbb3444` | `—` | 197130 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-21.jpg` | `f8d6fa6db4cebaeb949742a883dbc01c5a295e704a924dbb33959eaf76fe530b` | `—` | 24851 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-22.jpg` | `2dad36470558f7c6ccd7d1664f7d49895b37faeb7aa6c4f4ccc1e28ddb817326` | `—` | 240314 | — |
| MISSING_IN_SRC | `TopTier_Implementation_Guide-23.jpg` | `c4c5df9181627babd1c8fb8db090761a5e15ca27a2fb981bc1cea3426de635e2` | `—` | 193569 | — |
| MISSING_IN_SRC | `Toptier1_Full_Audit_and_StepByStep_Procedure.md` | `33537f93f9a6c64810daeed0bc7826d1c2e9c6c28e8be454e1413ad36495a242` | `—` | 29134 | — |
| MISSING_IN_SRC | `_headers` | `746a40da32bbe5b87d85b253db1fee4c2d1c32e95ac8201a43bdb903953c056f` | `—` | 1618 | — |
| MISSING_IN_SRC | `_redirects` | `a4d86eb73201cbdeeddf70a71fa77e29f85c980b016cee13c972ce2ce116a36c` | `—` | 1738 | — |
| MISSING_IN_SRC | `about.html` | `48d5cd90e9d773ae6c1c31d32b272031b7e792df96208eb0ecb4a747dcf543b4` | `—` | 4788 | — |
| MISSING_IN_SRC | `app/api/leads/route.ts` | `98000fdd0b2b198434914f740bef8bab97693b8d3de68ce12b3d62e44a0f4ea6` | `—` | 2197 | — |
| MISSING_IN_SRC | `app/commercial/page.tsx` | `01deafec943a31d360ebcf6d6d96880755d9188c5eeb6563b5c84210fbc25b8a` | `—` | 1795 | — |
| MISSING_IN_SRC | `app/layout.tsx` | `8aa2f1b1549f45747e7e1156e25dd8742a46b325a59d1ecfb7f795db9e73cf55` | `—` | 456 | — |
| MISSING_IN_SRC | `app/residential/page.tsx` | `024503313753799beb5e658d1cbfa224619865ce3355a5838df6381510c40270` | `—` | 2700 | — |
| MISSING_IN_SRC | `app/reviews/page.tsx` | `0d88f56a8c7dddb9b86a71527a987c04526c3fd7cd254dc593b44ecbe5c8bd3f` | `—` | 1281 | — |
| MISSING_IN_SRC | `app/robots.ts` | `24606a2643bb1bd6227a9c50e8eba7753befc84c2847b3bdbc99e7edfe87cafc` | `—` | 341 | — |
| MISSING_IN_SRC | `app/sitemap.ts` | `4768de5c32e1f06f92f3e61c1781c847a84335b2e1a84e4164112be5dbc40d05` | `—` | 1156 | — |
| MISSING_IN_SRC | `app/thanks-booking/page.tsx` | `86d898d54825be7e54a96e20c288b8187cb0762a1e3278fc2d8908f2c8259954` | `—` | 503 | — |
| MISSING_IN_SRC | `app/thanks-contact/page.tsx` | `2441948ac12491b93dd12ca124b9a80d88ae286166fa6a237ae454e4f0d32757` | `—` | 510 | — |
| MISSING_IN_SRC | `artifacts/local-seo/codex-prompts.md` | `f054c81bbca65c489eadb61de75da2c851a22aa97ac6ba81197aef30e99a18e0` | `—` | 1884 | — |
| MISSING_IN_SRC | `artifacts/local-seo/report.json` | `514c52e8dcff857d49adbe97f33f3722d09b00016bf9511ecf32bee5763b36e1` | `—` | 12495 | — |
| MISSING_IN_SRC | `artifacts/local-seo/report.md` | `0d6114c1a64d7e597b03a9292237e0780f87bcbca26b543a8363074127d47965` | `—` | 4025 | — |
| EXTRA_IN_SRC | `assets/css/styles.css` | `—` | `0c84f9121b62d6200d3a7862f10f5f19115d8f9c093aca931156407ef24e86ff` | — | 7178 |
| MISSING_IN_SRC | `assets/images/TopTierElectrical_logo_gold_qb_transparent.png` | `aa6b78ce773474bf32d34a0e2edc6c864f12129f3333888a21947bda51b32557` | `—` | 279092 | — |
| MISSING_IN_SRC | `assets/images/hero-original.jpg` | `6bc0a3eae374d985834a0d744e6146670a3f324f24150518770458de0927ecc4` | `—` | 2352663 | — |
| MISSING_IN_SRC | `assets/images/hero.jpg` | `4b873c1332f6a61fd5ae0de33cba559347d0490d4d352802629ec74921e5ac91` | `—` | 246897 | — |
| MISSING_IN_SRC | `assets/images/logo.svg` | `d04caa0647c58488667fff890f0c1a1e186067062468adb0770f696fcb6361e8` | `—` | 204 | — |
| MISSING_IN_SRC | `assets/images/logos/TopTierElectrical_Primary_Black_2048.png` | `b554440086d91395b8a4e7bd79855abc3213c6e560c9b7e6715148441f751184` | `—` | 411221 | — |
| MISSING_IN_SRC | `assets/images/logos/TopTierElectrical_Primary_FlatGold_2048.png` | `11bde79f67503ea35f8f0826bf6722a6a74e25032b11103d792d0ca2661c0356` | `—` | 442019 | — |
| MISSING_IN_SRC | `assets/images/logos/TopTierElectrical_Primary_FlatGold_4096.png` | `46d00ae655e82c8d438325114563214e79f32939141efb57d7123629e9a5ec57` | `—` | 1214175 | — |
| MISSING_IN_SRC | `assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png` | `6856cedb15f3c399ea2124bf0d5ca010c97ec754c815300e9f57e5040c7e0f5b` | `—` | 53223 | — |
| MISSING_IN_SRC | `assets/images/logos/TopTierElectrical_Primary_White_2048.png` | `0e470f5e3dc4516778dc9c49f1e2ca57c4bc8904f27286179237df14ddb30ce1` | `—` | 439610 | — |
| MISSING_IN_SRC | `assets/images/logos/TopTierElectrical_Primary_White_512.png` | `5e246f10828b2615801322ad5c7d20b1f2e76aad9b284599d03232eef93f0141` | `—` | 50242 | — |
| MISSING_IN_SRC | `assets/images/projects/3-phase-service.jpg` | `797238bc376ad6d3ad506b33d4047e755f3247ede30239f445259d96f10f0c6d` | `—` | 258387 | — |
| MISSING_IN_SRC | `assets/images/projects/480v-3-phase.jpg` | `6f2d9efda87bfc54b9543601d5b3a890890f18d76a570eeacd1de159755f40e0` | `—` | 708425 | — |
| MISSING_IN_SRC | `assets/images/projects/barn-photo.jpg` | `5a9a972e2076b073b3043b2cf27803e6f9bc9ccf8e7c46c62dc3130c47ad4bf7` | `—` | 946367 | — |
| MISSING_IN_SRC | `assets/images/projects/carl.jpg` | `8b9dcd4f86753ca60ccf92d01312aa170ca5a9a87aee87be198259ccc10dc8f4` | `—` | 264083 | — |
| MISSING_IN_SRC | `assets/images/projects/commercial-control-panel-wiring.jpg` | `2397af7e2df07cf8e3d58b1e7888e4cbc51e95ae8d6a73b1718aafa497853064` | `—` | 689334 | — |
| MISSING_IN_SRC | `assets/images/projects/conduit-piping.jpg` | `1b52be81f6d08baa1d2212b5a05e944d11ef616fcf0647543fc5af469325e351` | `—` | 311517 | — |
| MISSING_IN_SRC | `assets/images/projects/conduit.jpg` | `3213d8b31dd49afdc31e1b21655cb2f1fd0f86a0e57dacf10ce7388b66bcdde1` | `—` | 379305 | — |
| MISSING_IN_SRC | `assets/images/projects/control-cabinet-2.jpg` | `e698db2f1495466b91137342316296c7d86bfc19dcb744d7524efe4cfa61e80e` | `—` | 348645 | — |
| MISSING_IN_SRC | `assets/images/projects/control-cabinet.jpg` | `1947163ab78bf699b0c7bc18d7781930ce05284cc64d7eada2a8ac39db82e487` | `—` | 323270 | — |
| MISSING_IN_SRC | `assets/images/projects/control-work.jpg` | `180a9e8c4a86838f0b76dd78f4ad1977de7443fe0ec37d588a22fb7497b19940` | `—` | 366637 | — |
| MISSING_IN_SRC | `assets/images/projects/dust-collector-motor.jpg` | `fa946be0d5f719835e1b66482e2a53aa750702ffca1470b3eabdaeae6bb339be` | `—` | 311750 | — |
| MISSING_IN_SRC | `assets/images/projects/dust-collector-system.jpg` | `d675fe005c2310da4e086bba1839c144376874fc7bc90c72b951f9757c47c357` | `—` | 443067 | — |
| MISSING_IN_SRC | `assets/images/projects/electrical-project-49-1200.jpg` | `42f5d0ee107b532dade1e2324c186daabf2e91c41f20849d857efe83e27569f7` | `—` | 343244 | — |
| MISSING_IN_SRC | `assets/images/projects/fire-response-2.jpg` | `e18909d4fc2c281b6cad5c3cd12acd4b4fb03982a3de65a859660f86d3238901` | `—` | 478187 | — |
| MISSING_IN_SRC | `assets/images/projects/gas-station-service.jpg` | `5c1d63e95f75d271970b6b2b8d821e81823c87e404c7678a429455d3ebaae3ab` | `—` | 4674447 | — |
| MISSING_IN_SRC | `assets/images/projects/generator-transfer-switch-install.jpg` | `d2aa4e9faaa22daebc879f5a318cda36727d45c6aac024e7adf013375569f0f5` | `—` | 731211 | — |
| MISSING_IN_SRC | `assets/images/projects/horse-stall-lighting.jpg` | `a6e1499830cd46e19687cdc4369e841c00a42f5ea9e47ca870c5a39942eb3944` | `—` | 2417036 | — |
| MISSING_IN_SRC | `assets/images/projects/kitchen-led.jpg` | `d2034c828879dfea3f4726e407b96e2eee26fbe72cbc856263c15431886b55d5` | `—` | 239793 | — |
| MISSING_IN_SRC | `assets/images/projects/led-handrail-4.jpg` | `6ce6a042670106ec07739273b10bf22be99d2f27c4a8f54d85d27ebb004e05d3` | `—` | 1427891 | — |
| MISSING_IN_SRC | `assets/images/projects/led-handrail-5.jpg` | `e03b3af6c56d824993b7ceb6ee01397629d79a7459d7f266c0f53882d9e90e85` | `—` | 1468371 | — |
| MISSING_IN_SRC | `assets/images/projects/led-handrail.jpg` | `957bba4c4332cfebcd669616ad5092158c0e2af287777aa8a82963449f3bab60` | `—` | 183095 | — |
| MISSING_IN_SRC | `assets/images/projects/led-shelfs.jpg` | `0ba713a8dfafa4168c3fb5123e75aaf20e7dc2fe2b0f6a92c4cccf08f788c975` | `—` | 195846 | — |
| MISSING_IN_SRC | `assets/images/projects/led-shelves.jpg` | `58f24cb16b167df56212db473e6ffb8b03535388afd36d8c9fa5592909495666` | `—` | 183441 | — |
| MISSING_IN_SRC | `assets/images/projects/logo.jpg` | `1dd8ade1352374c5731e797c9084d62be48416736789db3c8accb37362117ae2` | `—` | 177124 | — |
| MISSING_IN_SRC | `assets/images/projects/motor-control.jpg` | `c8f0c08d7ee63c477ec555b3716635af463af2e57d9ae517785a948d7ae0ad07` | `—` | 2428905 | — |
| MISSING_IN_SRC | `assets/images/projects/motor.jpg` | `4c287b707364809d85f823b309e0fd8b28f0f69b14e060d40936b2d840e1ee97` | `—` | 224727 | — |
| MISSING_IN_SRC | `assets/images/projects/myenergi-4SyUf9MvWjU-unsplash.jpg` | `b891404547738c9bcee2c6644a0d9ff1772f7c820b0fd1f3279a064f1030c357` | `—` | 274031 | — |
| MISSING_IN_SRC | `assets/images/projects/panel-work.jpg` | `42bbb0f1a7d625fc2bd74f98f480895ad2773d0fb9cb4888c124122ee2a0ad18` | `—` | 2699241 | — |
| MISSING_IN_SRC | `assets/images/projects/pipe-rack.jpg` | `e2a6d6b10656119309318bbed5d62a4195cccaae9bd65af3b2e7af05823e8ef9` | `—` | 297056 | — |
| MISSING_IN_SRC | `assets/images/projects/piping.jpg` | `85ce8b935d6f9a5fe07715c0c47eab43acdd5b397c8bc1700f289f6731864fa8` | `—` | 284914 | — |
| MISSING_IN_SRC | `assets/images/projects/selenoids.jpg` | `4d0a9966844027fa461be84deee06758c1dc2f63a8e10679e66b3b35fce8cf71` | `—` | 336758 | — |
| MISSING_IN_SRC | `assets/images/projects/service-after.jpg` | `f811d93189dba127351c33cf6201930d6c383693494943879875f3987ee5d48b` | `—` | 234431 | — |
| MISSING_IN_SRC | `assets/images/projects/service-panel-upgrade-detail.jpg` | `2052c64eb3bec5dd32eca77e459629ae238736aa73d9961ea895846313983731` | `—` | 934140 | — |
| MISSING_IN_SRC | `assets/images/projects/service-upgrade-before.jpg` | `65c25121dc866e0cb53a835375a2cec6f4951f2a6d9af8b24c0f8045a0acb217` | `—` | 358356 | — |
| MISSING_IN_SRC | `assets/images/projects/storm-emergency.jpg` | `65ad612c35502c210de7aa53918a86c2a02660eee3f46b11889605117e7c9843` | `—` | 217387 | — |
| MISSING_IN_SRC | `assets/images/projects/transformer.jpg` | `3c6abe7313894f798b399fc3fabc4e01409a43690f83c8e51ff15e0a7efd73fc` | `—` | 390101 | — |
| EXTRA_IN_SRC | `assets/js/site.js` | `—` | `cab6bef0e9c4c9eac1f711bd17aaa609fa8dba78d858daf6d467d90e03c71667` | — | 4392 |
| MISSING_IN_SRC | `audit-deliverables.md` | `4640cf983def781638328581620f7c395c2724608693722233bc7d3c72224540` | `—` | 32351 | — |
| MISSING_IN_SRC | `audit-findings.json` | `4698fd2ebb337fc346ea7c970a07ffa2e58e549832a742c64b429ae415fa1068` | `—` | 649 | — |
| MISSING_IN_SRC | `audit-report.md` | `2c2bab7ffd947f88d2797ff638489d24a8ec3a7e03d4497f1c1584f124f801ff` | `—` | 2355 | — |
| MISSING_IN_SRC | `backlog.yml` | `66098998e921123a45d5f21e3a7b536c85485cbf5f1535ed01bf79ffd3e2e9ce` | `—` | 229 | — |
| MISSING_IN_SRC | `blog-electrical-safety.html` | `e048bc41195bdeeda91b9c7b8d65245491060e793e0da2a82e45c768ef2ef0f9` | `—` | 14624 | — |
| MISSING_IN_SRC | `blog-ev-charging.html` | `bcb0d495ac8a6798f163b064709a68b61c1e5b924cea7d0aa547ad0c1c8ca303` | `—` | 15904 | — |
| MISSING_IN_SRC | `blog-generator-readiness.html` | `dc44f03b95b09d641021459ce65942ce8f8847db85f7b57ff9cdf61cb5483869` | `—` | 13565 | — |
| MISSING_IN_SRC | `blog-panel-upgrade-signs.html` | `de942fadfc4904e9ceac4af8083f20a9f49e4eb663e693bd529dce646261c2fb` | `—` | 13307 | — |
| MISSING_IN_SRC | `blog-right-electrician.html` | `5b43ed39d3611598bf989cbb16f494c69332cdde1ae876678ecaf7ffa47044ba` | `—` | 16120 | — |
| MISSING_IN_SRC | `blog-surge-protection.html` | `cacb7013a1254409f20d7769177f10fb065ebddfa5a1d2c20575fcc6eed0bf8e` | `—` | 14227 | — |
| MISSING_IN_SRC | `blog.html` | `306aecfbf2bdd50ddac5cdf46f1d33ed705e99d433764bc582af41fb29164b54` | `—` | 18089 | — |
| MISSING_IN_SRC | `booking.html` | `2c665623f316809bdd1eb544c3879ec3153dec01a2be3c0bca948b79d0795f91` | `—` | 14632 | — |
| MISSING_IN_SRC | `branches.txt` | `b2cf5e0a51fb2fd46db023201c23118f1fce15486ecfaab7ff4d771b89395cb9` | `—` | 3266 | — |
| MISSING_IN_SRC | `bundle export` | `01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b` | `—` | 1 | — |
| MISSING_IN_SRC | `commercial-electrical-maintenance.html` | `b4cfc098d3a80ace60dc91a5989ea3b3c2f357dab215411ba36261511c8ac93d` | `—` | 5527 | — |
| MISSING_IN_SRC | `commercial-electrician-allegan-mi.html` | `c5ade30d7701150583f5fff288959aa696ec95581749b22588896f6638b4b71a` | `—` | 8081 | — |
| MISSING_IN_SRC | `commercial-led-lighting-retrofit.html` | `e0d472a53984e7e2e49c13a246ac3a11975e38551314ac1f14e2f6fd7f59c617` | `—` | 5857 | — |
| MISSING_IN_SRC | `commercial.html` | `0da4577a7957f3b09f5f28ea0d5ff1361c090b195fad32ab1a88ac7472bf27b1` | `—` | 4009 | — |
| EXTRA_IN_SRC | `components/HeroImage.tsx` | `—` | `f3c451b895c0518d357cd23d5aa75d9da5bac7ecda1416dd03c15cfb2f228ecc` | — | 238 |
| EXTRA_IN_SRC | `components/analytics/Track.tsx` | `—` | `29826e584b8a20a93bd3f5e9b11b056efcd55340275f762c371aad6dee82a825` | — | 389 |
| EXTRA_IN_SRC | `components/cta/CallTextCTA.tsx` | `—` | `9ee289f0fecc624f182e60e9b49078cc98706cc27d36453adb08a5a86c2d1884` | — | 698 |
| EXTRA_IN_SRC | `components/forms/LeadForm.tsx` | `—` | `85202ed879534d19de8f03c6c06fea94ca84152c8abb9a963ed228484939e747` | — | 3200 |
| EXTRA_IN_SRC | `components/seo/Breadcrumbs.tsx` | `—` | `b3422d189acf6bc21fbfa38b051bca18329776820d2e724798dda6f95d815da2` | — | 501 |
| EXTRA_IN_SRC | `components/seo/JsonLd.tsx` | `—` | `fe79cffdf4b71d1406323d0df288e210985c9410ff33285b980bc1592ea32a59` | — | 472 |
| EXTRA_IN_SRC | `config/pages.ts` | `—` | `f6b466f33c61b0cb98fb744a32cae9bd0ba6407543ce71c08c84ec0463bf584e` | — | 1109 |
| EXTRA_IN_SRC | `config/services.ts` | `—` | `d7bf5d808e5f132562d8bf214fc1b6994ae18a2d8ac659f79fd54a18fb88a733` | — | 3546 |
| EXTRA_IN_SRC | `config/site.ts` | `—` | `205bca4ca864ab36a680dc45695d851a80fa176be19fec2396d8c049a540cb4f` | — | 1694 |
| MISSING_IN_SRC | `contact.html` | `77810d9e4bb6ee30b0af1449537ae049fa17a6c2b3a5aa43e8a7b06c039335dd` | `—` | 14056 | — |
| MISSING_IN_SRC | `css/components.css` | `96fbc57cb04e5529021b67b73e60c707b415de7408e0e2ce91879c3d50fe9123` | `—` | 2445 | — |
| MISSING_IN_SRC | `css/design-tokens.css` | `3a3b0961c53ff0498eb7b0da62ac7b1370dbab87103a438f18d49fe3d8d65d02` | `—` | 1053 | — |
| EXTRA_IN_SRC | `data/site.json` | `—` | `0e25a9e9150240ff302bfac6f4623e3bdd81fb9394930d22b359249e18cb2497` | — | 5624 |
| MISSING_IN_SRC | `docs/CLEAN_REPO_EXPORT.md` | `7b1f5f0c1c82e80cb7e2be1a07f6dcefae04fe6267b9387359e905b61e8ac9c1` | `—` | 1773 | — |
| MISSING_IN_SRC | `docs/CLOUDFLARE_DEPLOYMENT_NOTES.md` | `1bae10d2ab66e7839b0c80d4741139f1f7f04d28be154a5c203132e60e915377` | `—` | 1530 | — |
| MISSING_IN_SRC | `docs/IMAGE-SOURCES.md` | `212a90126457a748fb8bdf52a11ad22cc94956e85cedafd693de2fb0ce70920c` | `—` | 3549 | — |
| MISSING_IN_SRC | `docs/OVERHAUL_BACKLOG.md` | `7be7541ebe2d720de7d1f707739e5f04722dc99d0fcdc38f3dd633717ceaf5ed` | `—` | 5522 | — |
| MISSING_IN_SRC | `docs/RISKS_GUARDRAILS.md` | `365d757dff65c239d206f4ccd91e7f64e7ed7dd817a9be999713ad4b2f5be98a` | `—` | 1440 | — |
| MISSING_IN_SRC | `docs/VERIFICATION_PLAYBOOK.md` | `331a7d85163263e9973ebb40fe6ce411603f22189a434f28ffd894e4970b474e` | `—` | 2330 | — |
| MISSING_IN_SRC | `docs/citations-nap.md` | `295141a695b97a25aeb5fe5409b9abc835164e536e94ec79c4e7383cd6c390a0` | `—` | 281 | — |
| MISSING_IN_SRC | `docs/competitive/serp-tracker.csv` | `3f0307589be5fe130b49d39b9b1ea250c79d098b985c098b3786d946e68474e0` | `—` | 80 | — |
| MISSING_IN_SRC | `docs/gbp-utm.md` | `fdd05f33f8296f394500f1f2746f946e49d33550384c8215dfa7cf8ff9f11dbc` | `—` | 375 | — |
| MISSING_IN_SRC | `docs/kpi-weekly-scorecard.csv` | `7b86d6583dc4639f32a1a5f66a9bd2915d8e47f177efd3343c6cf57600f80ce3` | `—` | 199 | — |
| MISSING_IN_SRC | `docs/launch-checklist.md` | `f53932815f4b52a1575febc3c1522422a7c1ef430ecffff5e3d0a67bf0f63c48` | `—` | 650 | — |
| MISSING_IN_SRC | `docs/measurement-plan.md` | `18cb997186f623e7814741fd61752cea1dec01e3aab743d961f12b2e6e4fb080` | `—` | 1776 | — |
| MISSING_IN_SRC | `docs/ops/monthly.md` | `9bfeacd174de57c76c9dfdebab369c4afebc8e329541f36ba4e5a1a3097f4c5b` | `—` | 235 | — |
| MISSING_IN_SRC | `docs/ops/quarterly.md` | `0fe3c0d2c2c90499b20df72642c19e32813e336b84afb26eb36eb0c7e48a1658` | `—` | 129 | — |
| MISSING_IN_SRC | `docs/ops/weekly.md` | `dcbd8a53fa3620ce05de26844f7e841eed6451083625606a487bffd605a047a9` | `—` | 237 | — |
| MISSING_IN_SRC | `docs/ops/workflow-control-matrix.md` | `54f61c896cd22753a055a98b2afd0e1cc2068679108dfbae29e68861d5891f55` | `—` | 3485 | — |
| MISSING_IN_SRC | `docs/seo/keyword-map.yml` | `fd19d0f78bf75449ab691a613da9f972d42c7c2e3dc0dfa92415ec470ef6c202` | `—` | 622 | — |
| MISSING_IN_SRC | `electrical-design-consultation.html` | `87f72c9ab6bbf5cc35c20eca96119554d1a353e27652a7a6b06143308c12983c` | `—` | 5563 | — |
| MISSING_IN_SRC | `electrical-repairs.html` | `a3396ed74636ff336ddcad7322602f9015a9e67bad5cd54aca5f7ff3c251e3a3` | `—` | 21668 | — |
| MISSING_IN_SRC | `electrician-ada.html` | `c43daf5b8a46b9af9e108a27225580c24381539f68b70ba7b097bd3a51f580fd` | `—` | 2313 | — |
| MISSING_IN_SRC | `electrician-allegan.html` | `e924fbaf043df298b8732cdc20f9a209da56a35dcd42d80bd38ad266ed6af715` | `—` | 2332 | — |
| MISSING_IN_SRC | `electrician-grand-rapids.html` | `75e50b00138dc204351c45e8d27615e2ac956925290efd4952624ae1c8dbf9b0` | `—` | 2388 | — |
| MISSING_IN_SRC | `electrician-holland.html` | `8ebb7094d0f3134348da3b6d3c8611c53d8106d72e592afc409a75ac2481efe1` | `—` | 2341 | — |
| MISSING_IN_SRC | `electrician-hudsonville.html` | `3c989e093fc573a14e111d922ea71cf98ff0023549f10504a7eabdf1b9fed413` | `—` | 2391 | — |
| MISSING_IN_SRC | `electrician-zeeland.html` | `ba556a9cb7b547eeaf626f770bcafa6201ef470237cbb9538ae340baf4e21be4` | `—` | 2364 | — |
| MISSING_IN_SRC | `emergency.html` | `ce6f2f4428abce6205ec6f0fd6dc28eef2064034945da307254fca78d74463a6` | `—` | 13574 | — |
| MISSING_IN_SRC | `energy-consulting.html` | `5e25f704ea5f972036f4a77bfe2deaddaa3670625437f923cbc7d29f8d9f1331` | `—` | 15364 | — |
| MISSING_IN_SRC | `energy-solutions.html` | `8bc2c2761d06c98dc91551ab5b89494613d42976dbe2101ad9116dbb4175a4ce` | `—` | 16108 | — |
| MISSING_IN_SRC | `ev-chargers.html` | `a01485b7a1090a563516a9d7b8b73ffd3a90349156e914258e15a932b607a958` | `—` | 18815 | — |
| MISSING_IN_SRC | `faq.html` | `1396cbf0c52e2885fa3c576ce903d264fc3e23865075739c9d7531d03a4a88a0` | `—` | 15959 | — |
| MISSING_IN_SRC | `financing.html` | `b6f5b6053b6a38c519899908f0f6e963e4845e5cc973afaabe9d53be7b9dacfd` | `—` | 3937 | — |
| MISSING_IN_SRC | `gallery.html` | `96d8febc045b071ab0f78aad05f96912f6489269f5bcd2d484b72b23bf46e923` | `—` | 22847 | — |
| MISSING_IN_SRC | `generators.html` | `4d75bc55d91fa8a381295df9939a11306736eee90a83357c6654480e15dcceb1` | `—` | 19026 | — |
| MISSING_IN_SRC | `img-0733-69955aad77cc2.webp` | `f4c745fe43e095a4ff66c96631f95364ae87ce62226494c3ba1e7d5b0d0b8602` | `—` | 25912 | — |
| MISSING_IN_SRC | `implementation_packets/01_home.md` | `de25d0a71f1b6b3c0f36703958429ef41faecd9afce280ec8278d46d9646eef2` | `—` | 744 | — |
| MISSING_IN_SRC | `implementation_packets/02_services.md` | `aed14245dabd998140d56d0d81978aa9c689d10cda4ac342b93ebc3887903a93` | `—` | 664 | — |
| MISSING_IN_SRC | `implementation_packets/03_panel-upgrades.md` | `72e32e891e9cf586743384252a2aae1e453366060f4131b04a6ff9e8f1a842fb` | `—` | 609 | — |
| MISSING_IN_SRC | `implementation_packets/04_ev-chargers.md` | `4b73055d9a0c5486086df5f2ecd5b85c9f7d8e6d9cef466b5ef8a9a6cf047903` | `—` | 561 | — |
| MISSING_IN_SRC | `implementation_packets/05_lighting.md` | `02d68b45ffc153323d23506c032de4bfc3a261d36bd02ef20b12f6c8a3474e23` | `—` | 478 | — |
| MISSING_IN_SRC | `implementation_packets/06_electrical-repairs.md` | `bd733b844c2e2d788a5bdcadd316969b8dbbcd21be6b16d987f194e056f5f63e` | `—` | 585 | — |
| MISSING_IN_SRC | `implementation_packets/07_generators.md` | `28f556f86faf34920990ca7cba3c8c1d377999ee2bd33da17cc7b5275f3e8ce5` | `—` | 560 | — |
| MISSING_IN_SRC | `implementation_packets/08_energy-solutions.md` | `be92c69dfcafa9232868946b544784bd7bdaad648ce298c98b45d963eb9fb4de` | `—` | 540 | — |
| MISSING_IN_SRC | `implementation_packets/09_energy-consulting.md` | `676c74496efab7073397a908a26cf613df38c30bfbb54ada544664a1917db650` | `—` | 568 | — |
| MISSING_IN_SRC | `implementation_packets/10_service-areas.md` | `c78281a1b8fe6277c4c2fd646fb38dea6ad6f15cc8582c4cf77a66cdcc0a10f5` | `—` | 588 | — |
| MISSING_IN_SRC | `implementation_packets/11_contact.md` | `12fd71c5786201bd1d0976fd7d430ed6342ea47e6ff80c9eed2c251cdf89e556` | `—` | 617 | — |
| MISSING_IN_SRC | `implementation_packets/12_booking.md` | `2ae67d71179c1386c3cb43d0af7e3225847b7e6e6c9cc754a0afa7b65a78e905` | `—` | 511 | — |
| MISSING_IN_SRC | `implementation_packets/13_testimonials.md` | `9c8ccdaf2af5307a68349acc7fe62b15357ad9564e032379e1bb880cbb4616d1` | `—` | 477 | — |
| MISSING_IN_SRC | `implementation_packets/14_financing.md` | `f01a17451c716bb453cd169cd543ae60d75f93eff1f88553e4ce51683dc4cb91` | `—` | 423 | — |
| MISSING_IN_SRC | `implementation_packets/15_emergency.md` | `9a13d72d5e7d63e8506efd73fe56e41a0ddd2c1808dc3307b45582223dd98167` | `—` | 420 | — |
| MISSING_IN_SRC | `implementation_packets/16_gallery.md` | `bc64aad495d7c79147aa40001c68164be4d3324582c3b1aef69075800bcf2759` | `—` | 336 | — |
| MISSING_IN_SRC | `implementation_packets/17_faq.md` | `8f8dcf638a5d173bfcc8f817d4b1669f7ce0414279e1fbbb8fbae0382602b262` | `—` | 409 | — |
| MISSING_IN_SRC | `implementation_packets/18_blog.md` | `a4cf300daa7b99b6aea85111dac91c17a97dcae02cec08e95e5d49216ebc6106` | `—` | 443 | — |
| MISSING_IN_SRC | `implementation_packets/19_blog-electrical-safety.md` | `3a3945d205a8ce4f3b9468bb1941483665d152332ae99fb7ebdc3e54dc5d3770` | `—` | 606 | — |
| MISSING_IN_SRC | `implementation_packets/20_blog-right-electrician.md` | `d34d5d2c1c3b7035b9835a2959c0fa7070baec09e0297d214b39fc2346286569` | `—` | 585 | — |
| MISSING_IN_SRC | `implementation_packets/21_blog-ev-charging.md` | `fc14ca7802353fc35aff370ad9122ad9220bee9e47dc14651ac805129c80a9cc` | `—` | 568 | — |
| MISSING_IN_SRC | `implementation_packets/22_blog-surge-protection.md` | `4effb3a6211d5bce79e461610d0dc347ef954be357829e388a29f7d4a6681021` | `—` | 541 | — |
| MISSING_IN_SRC | `implementation_packets/23_facebook-alignment.md` | `9a3b39fa45e1baf520f9ff5c8c2f11b4bf99fa9bc42cf4b2316c9c2980a0adae` | `—` | 1262 | — |
| MISSING_IN_SRC | `index.html` | `e4bf336939a88e8ccc7467b2f9dba7d4ec83f3d4f7e824761c9763a39ea4f142` | `—` | 28645 | — |
| EXTRA_IN_SRC | `lib/analytics/events.ts` | `—` | `3763b6da57f2a8353f54d6ac83bd2b4ed228ce69efe5e6adead04d862b8e899c` | — | 571 |
| EXTRA_IN_SRC | `lib/marketing/utm.ts` | `—` | `60c7ffbebe45c8373c5e1f9fa23f5767a10bc5950b56792140dc9e97c70d73a0` | — | 540 |
| EXTRA_IN_SRC | `lib/seo/metadata.ts` | `—` | `af9520ad5af0df7c92c5d6709802e9ae098c900492c5233bff145dd33e9c70b3` | — | 1427 |
| EXTRA_IN_SRC | `lib/seo/schema.ts` | `—` | `f8d73d968e86ada286d115605f489e7c274d40a184fae1c0b792e26b042b91ad` | — | 2310 |
| MISSING_IN_SRC | `lighting.html` | `72b66bcb11bcecc3f8fe8b2e7c08121b3839807cc996c15f66f6dd72ec46f582` | `—` | 17877 | — |
| EXTRA_IN_SRC | `local-seo/audit.ts` | `—` | `a6a7fac811590fa4891f8cd4ba7f1a6ae8bdd2b095bf12bf5203f9c31156cce2` | — | 2174 |
| MISSING_IN_SRC | `local-seo/citations.example.json` | `75667f85d53786f8b08151a1efcdd24aaee06d678e408fcec99704f58e3f01a6` | `—` | 515 | — |
| MISSING_IN_SRC | `local-seo/citations.json` | `75667f85d53786f8b08151a1efcdd24aaee06d678e408fcec99704f58e3f01a6` | `—` | 515 | — |
| EXTRA_IN_SRC | `local-seo/citations.ts` | `—` | `83d4ea8133b7df830f355bde6c51f1477ee6b615c77b67eab84bb46e757100f4` | — | 1156 |
| EXTRA_IN_SRC | `local-seo/date.ts` | `—` | `29be04b543fd08d0c4f10984959e48e6a70fdac7106498eb169e9cfb7d527650` | — | 494 |
| EXTRA_IN_SRC | `local-seo/fetch.ts` | `—` | `5cbc468baccda7bb6707b4bfc3e99753c750e39e5530ab73016236bb6f8cbe22` | — | 684 |
| EXTRA_IN_SRC | `local-seo/format.ts` | `—` | `1c2313a3df4b4f3de1efa105503668461515ec8c114ddda2d97a8c608028591a` | — | 3215 |
| MISSING_IN_SRC | `local-seo/gbp-profile.example.json` | `2d838b50f4406eaf345588522712edae5159592fc924c7ba74def240a28b8087` | `—` | 1343 | — |
| MISSING_IN_SRC | `local-seo/gbp-profile.json` | `2d838b50f4406eaf345588522712edae5159592fc924c7ba74def240a28b8087` | `—` | 1343 | — |
| EXTRA_IN_SRC | `local-seo/gbp.ts` | `—` | `325e3d81f2220cc47e04911015f3de3cf056ae154e6965bda9c29c41148fc856` | — | 2109 |
| EXTRA_IN_SRC | `local-seo/parse.ts` | `—` | `8e227bbc5805552d9f8eb1ae43b121656718a87f42d19ab4f86a418b66333a76` | — | 3885 |
| EXTRA_IN_SRC | `local-seo/repo.ts` | `—` | `6920cfed0b145276d6a1aeefe4d0ea26cf2abe834cd3b0780ebb786802898c18` | — | 3396 |
| EXTRA_IN_SRC | `local-seo/rules.ts` | `—` | `d96434dbdfee3734d4b05dcbd732437bc8e64539e3db1bdba7bca3dce8695f0f` | — | 20878 |
| EXTRA_IN_SRC | `local-seo/score.ts` | `—` | `d92695e3124f8e5d978f2cf4335a3be4214820532df4bb0075d32a5065820e5e` | — | 1478 |
| EXTRA_IN_SRC | `local-seo/thresholds.ts` | `—` | `54cfbfd8f9ee7e2ef21f5c48223d35ca3429dbeb3991478850c55effecf511a7` | — | 572 |
| EXTRA_IN_SRC | `local-seo/types.ts` | `—` | `56252a1bdbd9359aad861cc0fd3c3737e14c45df67d570c23c2863b7e08f26ba` | — | 3258 |
| MISSING_IN_SRC | `next.config.ts` | `9e5866a6d8e06d6c10e6fe9e0c98458facff8ed7d98ba48b3b1dd883f102a9fa` | `—` | 654 | — |
| MISSING_IN_SRC | `owner_friendly_with_dog_800.webp` | `c5bfca602ee55a5341a9bf18bb7b7d9f829b33711067f7aba21d7418276b3052` | `—` | 96712 | — |
| MISSING_IN_SRC | `package-lock.json` | `0a65eed5f3688a02d767b00886856fd7b576fbe9acb16a2e3286767bfc386020` | `—` | 64641 | — |
| MISSING_IN_SRC | `package.json` | `f5dca35b51f22e1a96727529bceed9287299c19d0809d05421a7c7ad9afb781f` | `—` | 2621 | — |
| EXTRA_IN_SRC | `pages/about.html` | `—` | `db9b558f53cc3bde309b9f394f2d866baf29975edd274ee111a39ec680ebd14e` | — | 792 |
| EXTRA_IN_SRC | `pages/blog/electrical-safety-tips/index.html` | `—` | `a9a2027a30f912020933b74c2dfa2bcd3689c661899cf5de908b1828d5cbf12a` | — | 1394 |
| EXTRA_IN_SRC | `pages/blog/ev-charger-installation-guide/index.html` | `—` | `d1eb9c307a70f77fb6b4bf048fe9404dd8c050388cc94a0b864c99a59c163270` | — | 1417 |
| EXTRA_IN_SRC | `pages/blog/how-to-choose-right-electrician/index.html` | `—` | `89fde67f2d8f09f548e361be1cdefa36ad2d50780cf7908d2a827ed53ce9b4f5` | — | 1363 |
| EXTRA_IN_SRC | `pages/blog/index.html` | `—` | `1c294010d7c8a6895f7bada6c0b32c8c3f3e32efd2dd3b2b3e98bf4fb0e8bd36` | — | 1488 |
| EXTRA_IN_SRC | `pages/blog/signs-you-need-panel-upgrade/index.html` | `—` | `005945e63df54b4c7eccbb1a6e86e7ed2843ac750217bc04caec35458fe2c81f` | — | 1365 |
| EXTRA_IN_SRC | `pages/blog/whole-home-surge-protection/index.html` | `—` | `6c1315009ed2058a39b0d5de663f22c9ee48236e6a76e5a55fbc63e4dd1de06f` | — | 1428 |
| EXTRA_IN_SRC | `pages/blog/winter-generator-readiness/index.html` | `—` | `9e93a9737b67073686214298ae1c5af02d86c50bcc635bb3b5d7600fa048cc56` | — | 864 |
| EXTRA_IN_SRC | `pages/booking.html` | `—` | `1158aa99a152adcc7b7af460bd0e29b0a1194498dae8074eaf620a61875366f8` | — | 1773 |
| EXTRA_IN_SRC | `pages/code-corrections.html` | `—` | `03a3dfbe42df626251417e9b4689c40e4f753ccbf1e150de03ba12c693c6cd06` | — | 2490 |
| EXTRA_IN_SRC | `pages/commercial.html` | `—` | `036e60ed16ae1816c2e6d4ea3e6cb0d28a99daebcc6ea98d2e5d244699cdf308` | — | 835 |
| EXTRA_IN_SRC | `pages/contact.html` | `—` | `649c841f347c12f758b67578c384306ff3193c27d337fcbd0a299dd918fa182b` | — | 1671 |
| EXTRA_IN_SRC | `pages/dedicated-circuits.html` | `—` | `2259df7f3b0c07c478b6b556ee613d7d53b12500a0c79ae6608f19a22cdf79d0` | — | 2399 |
| EXTRA_IN_SRC | `pages/electrical-repairs.html` | `—` | `7028c113afd54153e70a95d4df7e541ba8d76ac781fbdd563282bf39bc094ac3` | — | 2503 |
| EXTRA_IN_SRC | `pages/electrician-allegan.html` | `—` | `227d03f60b85cb8597c328c1dcaf444457630fed2471dc0a99892a38de6a286d` | — | 2785 |
| EXTRA_IN_SRC | `pages/electrician-grand-haven.html` | `—` | `e4baeb7215a5c476ffd7c9623c1fbe24d010ef5d709918c145cc7fedb6e0c46e` | — | 2870 |
| EXTRA_IN_SRC | `pages/electrician-grand-rapids.html` | `—` | `b6aeea7daf865e324425d6a56b26d3d7bbea62f33cde18e79ad804650cf59738` | — | 2903 |
| EXTRA_IN_SRC | `pages/electrician-holland.html` | `—` | `2ca8faa01a863f9d03c02126547063673506cec7dd6aeee419c1ce3e8fa6b083` | — | 2831 |
| EXTRA_IN_SRC | `pages/electrician-muskegon.html` | `—` | `3c6edb8e90bb745941f64b0d4035f0f6edd3e8597447ff276f045f07c5a7bde9` | — | 2748 |
| EXTRA_IN_SRC | `pages/emergency.html` | `—` | `a6217ab688a83502d189f66bb1a178a9ccb3a351a8b6e003a612521993263568` | — | 819 |
| EXTRA_IN_SRC | `pages/ev-chargers.html` | `—` | `42a631c82c54fdf09fff79febc7e65d916279b95a055dfded6f79961be13d8bc` | — | 2423 |
| EXTRA_IN_SRC | `pages/faq.html` | `—` | `bde889ee3ae949c923ed849eada40035121a6d5f4719c08909b74ac6da97ac3b` | — | 756 |
| EXTRA_IN_SRC | `pages/financing.html` | `—` | `30cbe984d327c721f2d6b699fcc4c47609fa05b509c2e34c83c9912841104292` | — | 756 |
| EXTRA_IN_SRC | `pages/gallery.html` | `—` | `1fc95e813931e0d21d492d4036326783dd30cb1b28a3db5f9c38e3cbf417e57d` | — | 5041 |
| EXTRA_IN_SRC | `pages/generators.html` | `—` | `65082194447d74db17ba3f89f784bd7f872ac2c26ee6b072c12e4fa4093711e8` | — | 2476 |
| EXTRA_IN_SRC | `pages/index.html` | `—` | `d0c0873e376799097c4ffaf4d74c37c78a89c5fae1df240782a4e1fed90c40d1` | — | 2891 |
| EXTRA_IN_SRC | `pages/lighting.html` | `—` | `8d4ace42ec6d51e4c50a983e400085615c14e6420cf857337cf2d2f119957755` | — | 2465 |
| EXTRA_IN_SRC | `pages/panel-upgrades.html` | `—` | `196569485b1193b606c257af1c7d17b45800557b2a10bfff862f52bb4b450872` | — | 818 |
| EXTRA_IN_SRC | `pages/residential.html` | `—` | `1943e0dd26422b4d91689be719a135cd350166a60dce29c14229e6ba660fae79` | — | 856 |
| EXTRA_IN_SRC | `pages/reviews.html` | `—` | `b056bfdfae3dfd81e7e5aea06dc3bc0eeb91646340b07299437a1e01d5c523a8` | — | 752 |
| EXTRA_IN_SRC | `pages/service-areas.html` | `—` | `9f5dc139318d57fb1ed11014a2b4b27d5754d0d28ee528147a1a64e98094ba6b` | — | 759 |
| EXTRA_IN_SRC | `pages/services.html` | `—` | `021e47c4c7629efcf640bd37027870b265bdec7e0395545b92cb1c1d275f6719` | — | 1259 |
| EXTRA_IN_SRC | `pages/testimonials.html` | `—` | `90065dd26f5e7ec0a154de328387a4f7e73fe7d6dda367f9805bceed1e0e2a59` | — | 9703 |
| EXTRA_IN_SRC | `pages/thank-you.html` | `—` | `55e86f018cc9f27eb0b6b750812ecdd7fa707fa3f418a03630c82a4eb70bb96f` | — | 738 |
| MISSING_IN_SRC | `panel-upgrades.html` | `3b388e3f053b6831b68ea247a6dfeb99c1127eab3c9f3634a96b674de8a3e44a` | `—` | 19128 | — |
| EXTRA_IN_SRC | `partials/footer.html` | `—` | `e7418559a90e75d864cd16ec9863858bb2e321bce09effc1486013974e74df7c` | — | 1397 |
| EXTRA_IN_SRC | `partials/header.html` | `—` | `b0dc0b4d8f413ad9a74842b0254477bed6d679dca6d1cc8634970f23a4561295` | — | 1132 |
| EXTRA_IN_SRC | `partials/includes/cta-call-inline.html` | `—` | `cb49d8aed01f5ddd7ecedb128260b10bdcb2bcc7cc8fabbacf85f4dee5a422dc` | — | 173 |
| EXTRA_IN_SRC | `partials/includes/cta-emergency-call.html` | `—` | `60dac4ef635e122e0d0544d572ba182dbfde568a43e6d5eb0442fc226cb49b51` | — | 168 |
| EXTRA_IN_SRC | `partials/includes/cta-hero-dual.html` | `—` | `e0c6c8967be70916f379029a33029fd999206aaabb2512b3d9b9a9f7be9dd881` | — | 347 |
| EXTRA_IN_SRC | `partials/includes/decision-cta.html` | `—` | `b0b2ad4bef12f68aa0ee15b34bdd537b056e89eb1de8ffd049b69d795fbcdf7f` | — | 544 |
| EXTRA_IN_SRC | `partials/includes/gbp-review-button.html` | `—` | `ef9c7617d90cb86948293cc840fde26608671b3a8900ba9c7efa9d2ae40768fb` | — | 150 |
| EXTRA_IN_SRC | `partials/layout.html` | `—` | `954f33edceb207dd51a6eeefd80b6678b7a4e9a93c2b4cadf038ccec0ffc6597` | — | 407 |
| MISSING_IN_SRC | `reports/.gitkeep` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | `—` | 0 | — |
| MISSING_IN_SRC | `reports/AUDIT_ZERO_UPDATE_VERIFICATION.md` | `295a78a0148586267d671ef74bd90d6c54efaccb6c46df78b43700c757b5a117` | `—` | 1315 | — |
| MISSING_IN_SRC | `reports/BASELINE_URL_INVENTORY.csv` | `27341bfe2287ddf7e484c45fce856e1dcfc58b1426c70642d57d41c3a77568a2` | `—` | 8097 | — |
| MISSING_IN_SRC | `reports/BYTE_LEVEL_REPO_AUDIT.json` | `9ed80efaaab0ee27dd63b403f8c07bdd130d642fe37ae07003da85a8b5c91b34` | `—` | 91031 | — |
| MISSING_IN_SRC | `reports/BYTE_LEVEL_REPO_AUDIT.md` | `94e5fb03e098d1635dd729b097e3b29d1f87bebff567f198291101acd898600c` | `—` | 21398 | — |
| MISSING_IN_SRC | `reports/BYTE_VERIFICATION_2026-02-10.md` | `d9b1a9caa164171045fb42af0438f27d5e5b787084dd67116f97d528bc7415ea` | `—` | 4395 | — |
| MISSING_IN_SRC | `reports/CI_VERIFICATION_2026-02-14.md` | `f2053101285e14fd1c96d725d20872ec6e4f4aacdd33df124eee0d19de70223d` | `—` | 714 | — |
| MISSING_IN_SRC | `reports/DOUBLE_CHECK_COMPLETION_2026-02-08.md` | `d112430ea59038b2ba4693ef8a8a5be7d4d5cff1d4015481ee1d670e85c8b787` | `—` | 1626 | — |
| MISSING_IN_SRC | `reports/EXECUTIVE_DEVELOPER_MODE_AUDIT_2026-02-08.md` | `da1bc12c2f7cff954eea7a3c2a4ea57ab8e6c824903ede3a908fcae30f31417a` | `—` | 7621 | — |
| MISSING_IN_SRC | `reports/FORMS_BASELINE.md` | `e3b2de399f750ee38d59481fd28c13a09be6e38dd8fc4e4d9af3f67d700e4661` | `—` | 1388 | — |
| MISSING_IN_SRC | `reports/FULL_AUDIT_CONTINUOUS_SWEEP_2026-02-15.md` | `9da0fa1ef1718d4f2f1d9b224b2ad019de04fbe27a5dfe99a3b3a1813be03f67` | `—` | 1371 | — |
| MISSING_IN_SRC | `reports/FULL_AUDIT_CONTINUOUS_SWEEP_2026-02-16.md` | `2bcfd608fb761970b054ee7f236945767deef8cb2d694fb89bdb229af24b7bb2` | `—` | 1276 | — |
| MISSING_IN_SRC | `reports/FULL_STACK_BYTE_AUDIT_2026-02-10.md` | `8a546a92e2f01a9ff027eb27190a38a3f91bedd65461a66d45a4ba5956d91d5d` | `—` | 8382 | — |
| MISSING_IN_SRC | `reports/FULL_VERIFICATION_SWEEP_2026-02-15.md` | `e0eda059732d1e07a650abb3243508f0fcbb63261b9fec732603a724c49bd2d8` | `—` | 1676 | — |
| MISSING_IN_SRC | `reports/IMAGE_INVENTORY_LOCAL.csv` | `dd33aab683b8b8c474108db352f06f42af8d2828f29c9b6eb9aaac117369de1f` | `—` | 7772 | — |
| MISSING_IN_SRC | `reports/IMAGE_INVENTORY_LOCAL.md` | `a104eba7b80677174147a83b1982ca017c4c069a1817f150ee45bd6512b3ed72` | `—` | 28800 | — |
| MISSING_IN_SRC | `reports/IMAGE_LOCATION_TEXT_AUDIT_2026-02-15.md` | `edc020e2c011b2a388700bb4bd007117c8dda24494f221acdb494d122b359b3c` | `—` | 6056 | — |
| MISSING_IN_SRC | `reports/IMAGE_LOCATION_VERIFICATION_2026-02-13.md` | `60d6d87e83a26db1a50bcfee906ea1902c51f26b50fc9633feca285d149e71be` | `—` | 1252 | — |
| MISSING_IN_SRC | `reports/IMAGE_LOCATION_VERIFICATION_2026-02-14_SWEEPS.md` | `95c9ec2e754580bbdf8f53cafe784e6bee919f7c98a3348675367b348e2ddac1` | `—` | 1534 | — |
| MISSING_IN_SRC | `reports/IMAGE_TEXT_REFERENCE_AUDIT.md` | `a0c2964084a17e3f264be605049837da3ac69ebef7dcfc76045f296c7e5098d2` | `—` | 228 | — |
| MISSING_IN_SRC | `reports/LIGHTHOUSE_BASELINE.md` | `5f034f2266c68cc0b7af7dfb2a18f19a779115f466ff7eb82e64cd6dc0061cba` | `—` | 2793 | — |
| MISSING_IN_SRC | `reports/LINKCHECK_BASELINE.md` | `33d00a119a3d2b7fd1f91cc7d8d97d5f93097df9157337e056e8a1f0c48a0adf` | `—` | 581 | — |
| MISSING_IN_SRC | `reports/MARKETING_OCD_AUDIT_2026-02-06.md` | `ca9bb3a5ed052e0525fe886ac31dd46d33d57cf295a3d1fb6dcf120030523578` | `—` | 7311 | — |
| MISSING_IN_SRC | `reports/MASTER_IMPROVEMENT_LIST_2026-02-10.md` | `06a5b0d4dba997c028ad187ff0b460fd3988f61643602a5a076e2632f55bfb09` | `—` | 8264 | — |
| MISSING_IN_SRC | `reports/MASTER_IMPROVEMENT_LIST_2026-02-10_REFRESH.md` | `04c5baa3a9bd6491a6da455592f0c14edcbd492c789f6c8b134bd5f50b7f5c9b` | `—` | 4161 | — |
| MISSING_IN_SRC | `reports/NAV_BASELINE.md` | `9d23128198d0dcff2d8055ab92167bca11b5456fb05ef56bde807c4b84b21278` | `—` | 625 | — |
| MISSING_IN_SRC | `reports/PROCEDURE_ACCURACY_VERIFICATION_2026-02-08.md` | `227753d61a1880baea3416506dd182b9941b130edbb373834af89e75a161d0d7` | `—` | 1905 | — |
| MISSING_IN_SRC | `reports/PR_RECREATION_ZERO_ERRORS_2026-02-14.md` | `1758d76d79db32ed97e2343eb55eb5cdc446f8b7b82f38286b41bbb60f8e5d47` | `—` | 874 | — |
| MISSING_IN_SRC | `reports/QA_GATE_FIX_VERIFICATION_2026-02-15.md` | `572a38069cc8fb74438f8c4f0381793aae5c3ac1ae5348497c45172b29fb53ca` | `—` | 899 | — |
| MISSING_IN_SRC | `reports/REDIRECTS_ERRORS_HOST_CANONICALISATION_AUDIT.md` | `eb638de986d560d3b3a35ab7fb83496df998f957d8c1bfc639ee0fa3df13909e` | `—` | 2882 | — |
| MISSING_IN_SRC | `reports/REDIRECT_CODE_AUDIT.md` | `d1b7bc20ef771565d6c0d510704bdf7fb94d513af86abdc95995d36c3266a59a` | `—` | 1625 | — |
| MISSING_IN_SRC | `reports/SYSTEM_AUDIT_IMPLEMENTATION_RESOLUTION_2026-02-08.md` | `a96b7c0b55b53d817c2495e6df96f3ac0d148ba96b305ac08146a43906c0b5c2` | `—` | 5484 | — |
| MISSING_IN_SRC | `reports/URL_INVENTORY_LOCAL.csv` | `4bdc493a69a79ca81a9db7a33806cdd0064a004ad40b685e1af4cd832c0b9590` | `—` | 8920 | — |
| MISSING_IN_SRC | `reports/URL_INVENTORY_LOCAL.md` | `803020a159b3602ba4b0be025cf639304382577dec031034f13566bc4b4d8cc4` | `—` | 16116 | — |
| MISSING_IN_SRC | `reports/VP_DEVELOPMENT_SYSTEM_AUDIT_2026-02-08.md` | `62016ff382ed0f14ea8d3eb315a89ec55fb83f9b51ed3e9aeb4c9a72f390e977` | `—` | 7765 | — |
| MISSING_IN_SRC | `reports/brand-system-cloudflare-audit.md` | `4a30f8e373861901b1e19c66edb6ca3f6e50a9a7fe37c04dd43ffe41952d30a3` | `—` | 16095 | — |
| MISSING_IN_SRC | `reports/crawl_raw.json` | `517a53665ac6e58212840fa0df45a6c13f627127fbb243d2fd371670421ca996` | `—` | 48305 | — |
| MISSING_IN_SRC | `reports/implementation-report.md` | `2177bf93e2c64ef4d56d4dafb9ab15b19210f73488e8d3a42ea68aa80df62620` | `—` | 70881 | — |
| MISSING_IN_SRC | `reports/newestupdate-implementation.md` | `c60b736febf78de411919e5c7a191b86ab0a467714d9ed9ebd60508c23b0b98a` | `—` | 451 | — |
| MISSING_IN_SRC | `reports/verification/headers-apex-home.txt` | `eefd42360bd1805ecd1da0695f2a68773884f030b640c4567ae921d10f2b57cf` | `—` | 205 | — |
| MISSING_IN_SRC | `reports/verification/headers-apex-sitemap.txt` | `96fffc15a93d5bba9f1ebf44f28b805a55d1a14e9c5b181a63a3207c1202011c` | `—` | 205 | — |
| MISSING_IN_SRC | `reports/verification/headers-http-www-home.txt` | `39e4d6a563f332166460ead71b30739cdac5fc1aaab8f046506d71ab7aa4c9a1` | `—` | 928 | — |
| MISSING_IN_SRC | `reports/verification/headers-robots.txt` | `b0c368c3a9eedbaeb1a83302a446e8d9937e4bb5d268f06f61ac4952af5add70` | `—` | 1587 | — |
| MISSING_IN_SRC | `reports/verification/headers-www-contact.txt` | `38d09c33b31e54e7898c985e886d43c14ef710c77817d001059268080300a62c` | `—` | 2234 | — |
| MISSING_IN_SRC | `reports/verification/headers-www-home.txt` | `19a8939b240cdd7e1ee156e97d67d7951e5a954a6c587edb3fbbb7eb7d4ea160` | `—` | 2225 | — |
| MISSING_IN_SRC | `reports/verification/headers-www-services.txt` | `77371ac4fd35daa09ddf093141c96c323232894b5ce535c959daf7777adc0329` | `—` | 2232 | — |
| MISSING_IN_SRC | `reports/verification/headers-www-sitemap.txt` | `96a90468bffc220dcd2c5d5e1f486d5599ac9c9a2af88e7e5b99cebe05bf8a44` | `—` | 2226 | — |
| MISSING_IN_SRC | `reports/verification/robots.txt` | `ae6224791c15eb6999342514dd50bd9b1a52e2dc0d441e41afb2ff4137f04943` | `—` | 1754 | — |
| MISSING_IN_SRC | `reports/workflow-performance-verification.md` | `f3348a04114ee1aa0c4cbd5f0264adc0b6bf6665995038e714ca44681d5c0929` | `—` | 2642 | — |
| MISSING_IN_SRC | `residential-electrician-allegan-mi.html` | `13b18971b87f0167487d667449e25df8b37ba45fa616058f50a846fabada9fcc` | `—` | 8958 | — |
| MISSING_IN_SRC | `residential.html` | `6bf647549b4d1de135bf6caabf5099876046e1fc4b3e6fcf72c6dabe0b7782a8` | `—` | 3558 | — |
| MISSING_IN_SRC | `robots.txt` | `c3517290435466ab391fa2d55eebaaacff02f79af19213d1e2129b3bcaf9a401` | `—` | 75 | — |
| MISSING_IN_SRC | `script.js` | `67d4d4aa9f5f3709d6274a42c12df0e90ec2df61935f63aa3955fb2d637ea4fc` | `—` | 4198 | — |
| MISSING_IN_SRC | `scripts/audit-image-text-references.js` | `571508d33b5b2962cf39af8781cb23b49706e56e0b4aa2e06652899b59876cbf` | `—` | 8818 | — |
| MISSING_IN_SRC | `scripts/audit-images.mjs` | `90669c2cdc0a79d2a8a9e29e827697aa3251640044c3f6567a518c8bad5331ae` | `—` | 582 | — |
| MISSING_IN_SRC | `scripts/audit-links-cloudflare.mjs` | `b60f0892b84bce5b340d83e5f58f79eea2e0dd08592ac113320087fdf4611bde` | `—` | 2394 | — |
| MISSING_IN_SRC | `scripts/build.mjs` | `af83a9de5ff94ab31fff7f16d28adaed4d5d33853349f2120aa9f76f3d3a8bf8` | `—` | 16412 | — |
| MISSING_IN_SRC | `scripts/check-content-mapping.js` | `a801adc5bf022d9f0569dbef7f22ced486335896d262667b606e7e163bcf68c5` | `—` | 4342 | — |
| MISSING_IN_SRC | `scripts/check-extensionless-collisions.mjs` | `bc2036fe53e6e7600e84d8352553c015d617ddb28bebc17ea1f89a4465ea6598` | `—` | 1133 | — |
| MISSING_IN_SRC | `scripts/check-extensionless-links.mjs` | `d299375729beb1b95f1738c3af1d217b8ab3e3ca8ed1ef8700eb79333372f781` | `—` | 1365 | — |
| MISSING_IN_SRC | `scripts/check-image-sources.js` | `b411ac5918af8fe036c213f5d8603ce5c3664cc6953bede287c7376b40f4b311` | `—` | 3512 | — |
| MISSING_IN_SRC | `scripts/check-navigation-sim.mjs` | `cf57bbb6ba75d286c47e49f0f6c591ad38247f1637484ba053552bda1bee146d` | `—` | 9027 | — |
| MISSING_IN_SRC | `scripts/check-navigation-simulation.js` | `e02b6504beb03541a942cba2f815ed20ff2ffb6fe34008c2a8739ae68f53ccd9` | `—` | 735 | — |
| MISSING_IN_SRC | `scripts/check-no-binary-files.sh` | `f3d584ee50c45c34b779db7cd9464cbfef5c549aef8edf92ecb24364108ebb48` | `—` | 1413 | — |
| MISSING_IN_SRC | `scripts/check-origin-redirects.js` | `ed3e5e38fa8c74a67251a3104233a65862ca304db94fa923e152c2f4abd69e86` | `—` | 2241 | — |
| MISSING_IN_SRC | `scripts/check-origin-redirects.mjs` | `1e777bc66fcdb025e4a1af429808846a14e5ec4e5db88c24a7f0e7cd865b1e4e` | `—` | 365 | — |
| MISSING_IN_SRC | `scripts/check-placeholders.js` | `bdfb79025f24481d3737e1037fc2a293a344e3890f459a472e22cd93c111174e` | `—` | 764 | — |
| MISSING_IN_SRC | `scripts/check-placeholders.mjs` | `320aa9999f8307320e972bea4e27ca41cbea589b80758e04a724a78b214744ca` | `—` | 807 | — |
| MISSING_IN_SRC | `scripts/check-redirects-cloudflare.mjs` | `b59f14d2b95bcb29dfd907ff5cc885867cc02c292c20d0023176e19966139e17` | `—` | 2708 | — |
| MISSING_IN_SRC | `scripts/check-workflow-location.js` | `c3967aec5d5e9052ed2b432f104301988fc0003e0b5d53d1c8a31e9048815e5a` | `—` | 1049 | — |
| MISSING_IN_SRC | `scripts/check-workflow-yaml.mjs` | `35f57b5ee660004b0f3319fb1b5e89ec3896a8860517406ad20a9d9cb41ebed7` | `—` | 1097 | — |
| MISSING_IN_SRC | `scripts/clean.mjs` | `b7dfc57a0b3fc3eb6eff49fd02027c0b42c460361d01c7417e431785a17f072b` | `—` | 99 | — |
| MISSING_IN_SRC | `scripts/crawl.js` | `8b18be53f82aaf0cda6264bdc0d5d0c48346c6899377aca52cf04224da6e7a3e` | `—` | 9175 | — |
| MISSING_IN_SRC | `scripts/create-clean-repo.mjs` | `f083032bfb969fdfc75ce1917a2777d0a464a4f06ac302f3d760ceb4a617e18d` | `—` | 8220 | — |
| MISSING_IN_SRC | `scripts/dev.mjs` | `b698c2903296b497d3e65d8d9cb4583cef241bed2e1eec0b5eeedb87612935d3` | `—` | 2412 | — |
| MISSING_IN_SRC | `scripts/gsc-gap.mjs` | `a8e68dbdc58cf945a6fd94de6b04ab5c164ca8c12007c0dbad3bf832e42a8eca` | `—` | 947 | — |
| MISSING_IN_SRC | `scripts/lib/fs.mjs` | `b7d0c01f98c9579f73be2319cd9f13e7db1ad82d99c548d2032ee9562b267c8c` | `—` | 1366 | — |
| MISSING_IN_SRC | `scripts/lib/images.mjs` | `d9351f87822ec5745003f33e30219e637e4bbdfd775ca5a42b408624e2234a25` | `—` | 1059 | — |
| MISSING_IN_SRC | `scripts/lib/meta.mjs` | `f5ab17b2940f7f0b29e82a95934e9efa132e38f929608220857e0adb142fa7c6` | `—` | 486 | — |
| MISSING_IN_SRC | `scripts/lib/template.mjs` | `37198f78cc525151ba9033a82c435f7a2badc1d8ed5a2966a5a5d4d17f412d45` | `—` | 994 | — |
| MISSING_IN_SRC | `scripts/lib/urls.mjs` | `4014c420bd67a7487ab9f476cbdcacf3478e3423985e2552beb4a314e0403d5a` | `—` | 697 | — |
| MISSING_IN_SRC | `scripts/lib/validate.mjs` | `96a5355406d4d7939699b712c13a03c2b243706772f76f0e3eb8787eec815013` | `—` | 7153 | — |
| MISSING_IN_SRC | `scripts/local-seo-audit.ts` | `3cbb82aad05d918512ad0675cdc603e8b7b8aa0a4adf2d22fb1706b650304165` | `—` | 5259 | — |
| MISSING_IN_SRC | `scripts/optimize-assets.mjs` | `31c3398214860203c4383ece434ff062cbebff82b1173bf2ade44aa8e9e46496` | `—` | 2249 | — |
| MISSING_IN_SRC | `scripts/savage-audit-all-branches.sh` | `e8f3143531670b10045d97a30b06bfc51930d62a1626c76b266c953d41155973` | `—` | 8148 | — |
| MISSING_IN_SRC | `scripts/savage-audit.sh` | `17202d30ffb0e3f001365ef1469f2a7d3f848bac15210c13ea101f9a6f5ae019` | `—` | 17973 | — |
| MISSING_IN_SRC | `scripts/seo-quality-gates.mjs` | `78e7835cf616be776263d33a70fe766cd85d12d16df65fea520fdc68a4d2450f` | `—` | 1661 | — |
| MISSING_IN_SRC | `scripts/verify-formspree-forms.mjs` | `2a43ae497069f5e5292f5b617083628d0dc441abe27c514ff0576d1c20329668` | `—` | 1618 | — |
| MISSING_IN_SRC | `scripts/verify-full-sweep.mjs` | `489b877ea97f692eec559dd801bbf6b166b19f6e029f418b11489197c4a8616c` | `—` | 4551 | — |
| MISSING_IN_SRC | `scripts/verify-stability.mjs` | `f83394f245fc4c216b775bccc5097d6df9e143130351f07755753f4d38f7999e` | `—` | 446 | — |
| MISSING_IN_SRC | `scripts/verify-zero-updates.mjs` | `26563ab81177fcd6febcc842ff2a76152a7be53ad817078929834ee9cf061d4f` | `—` | 914 | — |
| MISSING_IN_SRC | `scripts/verify.mjs` | `12cb863aabeb6f0b3e2d8700a661b27efb43d8e93af0e1d236097f937c0803c0` | `—` | 246 | — |
| MISSING_IN_SRC | `scripts/with-chrome-path.sh` | `d8685de71f7e84601d90d083dfdd480aff2da82ac334b6f7e07cab63d3efbafe` | `—` | 3721 | — |
| MISSING_IN_SRC | `service-areas.html` | `7671e3697bfc42b8bca2e77c0b5e509caf84a971e0be67303da4af60d5d45a8e` | `—` | 12453 | — |
| MISSING_IN_SRC | `services.html` | `5dad1a40a18d7ef128f04525d2854baa21c2198be84ec9ab017308a3f8ce812b` | `—` | 24400 | — |
| MISSING_IN_SRC | `sitemap.xml` | `8a2b372dacf399cb6874ad6adfceb87828e746a6ff1c3d058c8f0d08a9140c0d` | `—` | 5654 | — |
| MISSING_IN_SRC | `styleguide-top-tier-electrical.html` | `24c309fae17df6ca1c42509028e4226d80a80223bb52a96273cc38a824c93b52` | `—` | 21000 | — |
| MISSING_IN_SRC | `styles.css` | `3aea82654b5074f47f9e57e280c3b8bec7c58ccfa08d6e72927d45f582967aad` | `—` | 39104 | — |
| MISSING_IN_SRC | `switch-gear-69955ab06fdb5.webp` | `d3b4df18e6495a4a145df063fbeb5605cd077991064733102d628bff4a116e95` | `—` | 6796 | — |
| MISSING_IN_SRC | `testimonials.html` | `9ff723e2e3950fc6389c54c9f1bc99c84b4bc223ebae11db1056e594aaa0c723` | `—` | 13278 | — |
| MISSING_IN_SRC | `thank-you.html` | `a9b04243c991aa37ad176d8d6accbca8d0b6a5833b15d8a84f0d5960fb704530` | `—` | 8351 | — |
| MISSING_IN_SRC | `tools/center_and_pad_logo.py` | `50be9ac3f7ec77097fde7c9f253a50b21837384743bfb4322a74ebe008f28479` | `—` | 5426 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/commercial-electrical/index.md` | `01f0be97d4dc7395151bf4d8592c432d21c4b29f541cbce39e90958381fd312c` | `—` | 1126 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/custom-home-new-construction/index.md` | `bbd190822e3b41f3aae73c8c9202ff45737bd05880792d1847f8a0969c652f77` | `—` | 2941 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/ev-charger-installation/index.md` | `f11444f33a2dd9c349e4dc55dc05aa5ee70e895ba971a764e4c8f3e922fea1a9` | `—` | 928 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/index.md` | `58686582bdeebbfeeb66c49ad17f9ea66ce43af335dbf619c19781e86a99cd3c` | `—` | 2668 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/industrial-equipment-power/index.md` | `e862dc9fe73fb53a2fd107f77834b71cc32835af84f274277808d238fd396f85` | `—` | 1034 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/lighting-design-installation/index.md` | `35c9d23634ffb75af36ad202a28ab0dbb788754ee4dcda0369d5956689d35e95` | `—` | 1118 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/low-voltage-structured-cabling/index.md` | `e0e2e0397cb73d89c17a45c215c2534761def052c12006d543136426a71cf97e` | `—` | 741 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/panel-service-upgrades/index.md` | `7ba6a5245f7b511347aebaf491007a962a8a551e0daf9577011e5e730d99b70f` | `—` | 1484 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/residential-remodels-additions/index.md` | `69dd5cee0e814714f08d81a31dfd3f5989ddd385b8d57360aff5aac7801db06d` | `—` | 1960 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/service-calls-troubleshooting/index.md` | `a9d761994d876b9a5268868e6237f090273cdd7ee696901c02488635b4d9069a` | `—` | 1206 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/specialty-systems-walkins-rtus/index.md` | `b9d1b2b4bc373fa9eb8989a371a8334f1ed223bee15e90b6ac0c9dca97de0e11` | `—` | 1081 | — |
| MISSING_IN_SRC | `toptier-service-pages/services/standby-generators/index.md` | `d574fab202cea1ba162fb89d38d2aefeb04835951c15c73e3623a000124c8a17` | `—` | 1199 | — |
| MISSING_IN_SRC | `wrangler.jsonc` | `a54b57291d4f15a1c9dad8556c24456039e1ef6746708c5c4a637caa3e3f9dd0` | `—` | 217 | — |
| MISSING_IN_SRC | `wrangler.toml` | `0cd9a80d418b54c1506c56b65794454b6ee3a6a8245d03e8e826acf58d14acef` | `—` | 129 | — |

### B.2 Root-only / Src-only decisions

#### MISSING_IN_SRC decisions (exhaustive)

| relpath | decision | proposed_target_in_SRC | verification_steps |
|---|---|---|---|
| `.env.example` | REPLACE_WITH_EQUIVALENT | `.env.example` | Manual review to map capability into SRC architecture. |
| `.github/workflows/ci.yml` | PORT_WITH_ADAPTATION | `.github/workflows/ci.yml` | Run workflow lint + trigger dry-run on feature branch. |
| `.github/workflows/deploy-cloudflare-pages.yml` | PORT_WITH_ADAPTATION | `.github/workflows/deploy-cloudflare-pages.yml` | Run workflow lint + trigger dry-run on feature branch. |
| `.github/workflows/deploy-prod.yml` | PORT_WITH_ADAPTATION | `.github/workflows/deploy-prod.yml` | Run workflow lint + trigger dry-run on feature branch. |
| `.github/workflows/format-with-prettier.yml` | PORT_WITH_ADAPTATION | `.github/workflows/format-with-prettier.yml` | Run workflow lint + trigger dry-run on feature branch. |
| `.github/workflows/qa.yml` | PORT_WITH_ADAPTATION | `.github/workflows/qa.yml` | Run workflow lint + trigger dry-run on feature branch. |
| `.github/workflows/quality-gates.yml` | PORT_WITH_ADAPTATION | `.github/workflows/quality-gates.yml` | Run workflow lint + trigger dry-run on feature branch. |
| `.github/workflows/quality.yml` | PORT_WITH_ADAPTATION | `.github/workflows/quality.yml` | Run workflow lint + trigger dry-run on feature branch. |
| `.gitignore` | REPLACE_WITH_EQUIVALENT | `.gitignore` | Manual review to map capability into SRC architecture. |
| `.htmlvalidate.json` | REPLACE_WITH_EQUIVALENT | `.htmlvalidate.json` | Manual review to map capability into SRC architecture. |
| `.pa11yci` | REPLACE_WITH_EQUIVALENT | `.pa11yci` | Manual review to map capability into SRC architecture. |
| `.prettierignore` | REPLACE_WITH_EQUIVALENT | `.prettierignore` | Manual review to map capability into SRC architecture. |
| `.stylelintrc.json` | REPLACE_WITH_EQUIVALENT | `.stylelintrc.json` | Manual review to map capability into SRC architecture. |
| `.well-known/security.txt` | PORT_AS_IS | `.well-known/security.txt` | Validate deploy + route/header behavior in preview. |
| `404.html` | REPLACE_WITH_EQUIVALENT | `404.html` | Manual review to map capability into SRC architecture. |
| `AUDIT.md` | REPLACE_WITH_EQUIVALENT | `AUDIT.md` | Confirm equivalent documentation section exists and links resolve. |
| `FINAL_VERIFICATION_PLAYBOOK.md` | REPLACE_WITH_EQUIVALENT | `FINAL_VERIFICATION_PLAYBOOK.md` | Confirm equivalent documentation section exists and links resolve. |
| `IMG_1183_Original.jpg` | PORT_WITH_ADAPTATION | `assets/images/IMG_1183_Original.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `IMG_1335_Original.jpg` | PORT_WITH_ADAPTATION | `assets/images/IMG_1335_Original.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `IMG_1380_Original.jpg` | PORT_WITH_ADAPTATION | `assets/images/IMG_1380_Original.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `IMG_1805_Original.jpg` | PORT_WITH_ADAPTATION | `assets/images/IMG_1805_Original.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `IMG_3053_Original.jpg` | PORT_WITH_ADAPTATION | `assets/images/IMG_3053_Original.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `PROMPT_BLOG_SITE_IMPLEMENTATION.md` | REPLACE_WITH_EQUIVALENT | `PROMPT_BLOG_SITE_IMPLEMENTATION.md` | Confirm equivalent documentation section exists and links resolve. |
| `Past_work_webp/3 PHase Service.webp` | PORT_WITH_ADAPTATION | `assets/images/3 PHase Service.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/7550693456474594645.webp` | PORT_WITH_ADAPTATION | `assets/images/7550693456474594645.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/After me.webp` | PORT_WITH_ADAPTATION | `assets/images/After me.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Air Compressor.webp` | PORT_WITH_ADAPTATION | `assets/images/Air Compressor.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Barn.webp` | PORT_WITH_ADAPTATION | `assets/images/Barn.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Before me.webp` | PORT_WITH_ADAPTATION | `assets/images/Before me.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Blower Motor.webp` | PORT_WITH_ADAPTATION | `assets/images/Blower Motor.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/CT CABINET Service upgrade.webp` | PORT_WITH_ADAPTATION | `assets/images/CT CABINET Service upgrade.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Conduit Piping.webp` | PORT_WITH_ADAPTATION | `assets/images/Conduit Piping.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Conduit.webp` | PORT_WITH_ADAPTATION | `assets/images/Conduit.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Control Cabinet.webp` | PORT_WITH_ADAPTATION | `assets/images/Control Cabinet.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Control Work.webp` | PORT_WITH_ADAPTATION | `assets/images/Control Work.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Counter Bar Lighting.webp` | PORT_WITH_ADAPTATION | `assets/images/Counter Bar Lighting.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Dust Collector System.webp` | PORT_WITH_ADAPTATION | `assets/images/Dust Collector System.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Dust Collector motor.webp` | PORT_WITH_ADAPTATION | `assets/images/Dust Collector motor.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/EMT Piping.webp` | PORT_WITH_ADAPTATION | `assets/images/EMT Piping.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Electrical Panels.webp` | PORT_WITH_ADAPTATION | `assets/images/Electrical Panels.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Exterior Light Fixtures.webp` | PORT_WITH_ADAPTATION | `assets/images/Exterior Light Fixtures.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Field Controls.webp` | PORT_WITH_ADAPTATION | `assets/images/Field Controls.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Fire Response.webp` | PORT_WITH_ADAPTATION | `assets/images/Fire Response.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Gas Station Service Call .webp` | PORT_WITH_ADAPTATION | `assets/images/Gas Station Service Call .webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Horse Barn.webp` | PORT_WITH_ADAPTATION | `assets/images/Horse Barn.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Horse Stall Lighting.webp` | PORT_WITH_ADAPTATION | `assets/images/Horse Stall Lighting.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/IMG_0733.webp` | PORT_WITH_ADAPTATION | `assets/images/IMG_0733.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/IMG_0852.webp` | PORT_WITH_ADAPTATION | `assets/images/IMG_0852.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/IMG_1380.webp` | PORT_WITH_ADAPTATION | `assets/images/IMG_1380.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/IMG_1599_Original.webp` | PORT_WITH_ADAPTATION | `assets/images/IMG_1599_Original.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/IMG_8814.webp` | PORT_WITH_ADAPTATION | `assets/images/IMG_8814.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Interior LED lighitng.webp` | PORT_WITH_ADAPTATION | `assets/images/Interior LED lighitng.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/LED Hand Rail.webp` | PORT_WITH_ADAPTATION | `assets/images/LED Hand Rail.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/LED HandRail.webp` | PORT_WITH_ADAPTATION | `assets/images/LED HandRail.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/LED shelves.webp` | PORT_WITH_ADAPTATION | `assets/images/LED shelves.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/LOGO.webp` | PORT_WITH_ADAPTATION | `assets/images/LOGO.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Light Fixture.webp` | PORT_WITH_ADAPTATION | `assets/images/Light Fixture.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Lighting Fixture.webp` | PORT_WITH_ADAPTATION | `assets/images/Lighting Fixture.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Lighting.webp` | PORT_WITH_ADAPTATION | `assets/images/Lighting.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Low Voltage LED.webp` | PORT_WITH_ADAPTATION | `assets/images/Low Voltage LED.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Meter Socket Bank.webp` | PORT_WITH_ADAPTATION | `assets/images/Meter Socket Bank.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Motor Control.webp` | PORT_WITH_ADAPTATION | `assets/images/Motor Control.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Motor.webp` | PORT_WITH_ADAPTATION | `assets/images/Motor.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Multi panel Assembly.webp` | PORT_WITH_ADAPTATION | `assets/images/Multi panel Assembly.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Panel Work.webp` | PORT_WITH_ADAPTATION | `assets/images/Panel Work.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Piping (2).webp` | PORT_WITH_ADAPTATION | `assets/images/Piping (2).webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Piping.webp` | PORT_WITH_ADAPTATION | `assets/images/Piping.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Residential Electrical.webp` | PORT_WITH_ADAPTATION | `assets/images/Residential Electrical.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Residential Panel.webp` | PORT_WITH_ADAPTATION | `assets/images/Residential Panel.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Residential Wiring.webp` | PORT_WITH_ADAPTATION | `assets/images/Residential Wiring.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Residential panel  work.webp` | PORT_WITH_ADAPTATION | `assets/images/Residential panel  work.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Selenoids.webp` | PORT_WITH_ADAPTATION | `assets/images/Selenoids.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Service after.webp` | PORT_WITH_ADAPTATION | `assets/images/Service after.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Service before.webp` | PORT_WITH_ADAPTATION | `assets/images/Service before.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/SteelTech Conduit Room.webp` | PORT_WITH_ADAPTATION | `assets/images/SteelTech Conduit Room.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Switch Gear.webp` | PORT_WITH_ADAPTATION | `assets/images/Switch Gear.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/TopTierElectrical_Logo_Web_600w.webp` | PORT_WITH_ADAPTATION | `assets/images/TopTierElectrical_Logo_Web_600w.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/TopTierElectrical_OpenGraph_1200x630.webp` | PORT_WITH_ADAPTATION | `assets/images/TopTierElectrical_OpenGraph_1200x630.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Transformer.webp` | PORT_WITH_ADAPTATION | `assets/images/Transformer.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/What not to do/Electrical Fail.webp` | PORT_WITH_ADAPTATION | `assets/images/Electrical Fail.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/What not to do/Electrical Mess.webp` | PORT_WITH_ADAPTATION | `assets/images/Electrical Mess.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/What not to do/IMG_0099.webp` | PORT_WITH_ADAPTATION | `assets/images/IMG_0099.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/What not to do/IMG_2522.webp` | PORT_WITH_ADAPTATION | `assets/images/IMG_2522.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/What not to do/IMG_3108.webp` | PORT_WITH_ADAPTATION | `assets/images/IMG_3108.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/What not to do/IMG_6894.webp` | PORT_WITH_ADAPTATION | `assets/images/IMG_6894.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/What not to do/IMG_8175.webp` | PORT_WITH_ADAPTATION | `assets/images/IMG_8175.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/Working through the Storms.webp` | PORT_WITH_ADAPTATION | `assets/images/Working through the Storms.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/backup Generator.webp` | PORT_WITH_ADAPTATION | `assets/images/backup Generator.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/conversion_report.csv` | PORT_WITH_ADAPTATION | `assets/images/conversion_report.csv` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/conversion_report.json` | PORT_WITH_ADAPTATION | `assets/images/conversion_report.json` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/index.html` | PORT_WITH_ADAPTATION | `assets/images/index.html` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/on site Service Sketch.webp` | PORT_WITH_ADAPTATION | `assets/images/on site Service Sketch.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `Past_work_webp/panel.webp` | PORT_WITH_ADAPTATION | `assets/images/panel.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `README.md` | REPLACE_WITH_EQUIVALENT | `README.md` | Confirm equivalent documentation section exists and links resolve. |
| `SEO_CONTENT_BACKLOG.md` | REPLACE_WITH_EQUIVALENT | `SEO_CONTENT_BACKLOG.md` | Confirm equivalent documentation section exists and links resolve. |
| `SEO_CONTENT_CHANGELOG.md` | REPLACE_WITH_EQUIVALENT | `SEO_CONTENT_CHANGELOG.md` | Confirm equivalent documentation section exists and links resolve. |
| `SEO_CONTENT_TRACKER.md` | REPLACE_WITH_EQUIVALENT | `SEO_CONTENT_TRACKER.md` | Confirm equivalent documentation section exists and links resolve. |
| `TopTier_Implementation_Guide-01.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-01.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-02.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-02.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-03.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-03.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-04.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-04.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-05.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-05.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-06.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-06.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-07.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-07.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-08.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-08.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-09.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-09.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-10.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-10.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-11.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-11.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-12.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-12.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-13.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-13.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-14.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-14.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-15.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-15.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-16.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-16.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-17.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-17.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-18.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-18.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-19.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-19.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-20.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-20.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-21.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-21.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-22.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-22.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `TopTier_Implementation_Guide-23.jpg` | PORT_WITH_ADAPTATION | `assets/images/TopTier_Implementation_Guide-23.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `Toptier1_Full_Audit_and_StepByStep_Procedure.md` | REPLACE_WITH_EQUIVALENT | `Toptier1_Full_Audit_and_StepByStep_Procedure.md` | Confirm equivalent documentation section exists and links resolve. |
| `_headers` | PORT_AS_IS | `_headers` | Validate deploy + route/header behavior in preview. |
| `_redirects` | PORT_AS_IS | `_redirects` | Validate deploy + route/header behavior in preview. |
| `about.html` | REPLACE_WITH_EQUIVALENT | `about.html` | Manual review to map capability into SRC architecture. |
| `app/api/leads/route.ts` | PORT_WITH_ADAPTATION | `api/leads/route.ts` | Run API contract tests and end-to-end form submission checks. |
| `app/commercial/page.tsx` | REPLACE_WITH_EQUIVALENT | `app/commercial/page.tsx` | Manual review to map capability into SRC architecture. |
| `app/layout.tsx` | REPLACE_WITH_EQUIVALENT | `app/layout.tsx` | Manual review to map capability into SRC architecture. |
| `app/residential/page.tsx` | REPLACE_WITH_EQUIVALENT | `app/residential/page.tsx` | Manual review to map capability into SRC architecture. |
| `app/reviews/page.tsx` | REPLACE_WITH_EQUIVALENT | `app/reviews/page.tsx` | Manual review to map capability into SRC architecture. |
| `app/robots.ts` | REPLACE_WITH_EQUIVALENT | `app/robots.ts` | Manual review to map capability into SRC architecture. |
| `app/sitemap.ts` | REPLACE_WITH_EQUIVALENT | `app/sitemap.ts` | Manual review to map capability into SRC architecture. |
| `app/thanks-booking/page.tsx` | REPLACE_WITH_EQUIVALENT | `app/thanks-booking/page.tsx` | Manual review to map capability into SRC architecture. |
| `app/thanks-contact/page.tsx` | REPLACE_WITH_EQUIVALENT | `app/thanks-contact/page.tsx` | Manual review to map capability into SRC architecture. |
| `artifacts/local-seo/codex-prompts.md` | REPLACE_WITH_EQUIVALENT | `artifacts/local-seo/codex-prompts.md` | Confirm equivalent documentation section exists and links resolve. |
| `artifacts/local-seo/report.json` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `artifacts/local-seo/report.md` | REPLACE_WITH_EQUIVALENT | `artifacts/local-seo/report.md` | Confirm equivalent documentation section exists and links resolve. |
| `assets/images/TopTierElectrical_logo_gold_qb_transparent.png` | PORT_WITH_ADAPTATION | `assets/images/TopTierElectrical_logo_gold_qb_transparent.png` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/hero-original.jpg` | PORT_WITH_ADAPTATION | `assets/images/hero-original.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/hero.jpg` | PORT_WITH_ADAPTATION | `assets/images/hero.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/logo.svg` | PORT_WITH_ADAPTATION | `assets/images/logo.svg` | Run build and verify static assets resolve with no 404s. |
| `assets/images/logos/TopTierElectrical_Primary_Black_2048.png` | PORT_WITH_ADAPTATION | `assets/images/TopTierElectrical_Primary_Black_2048.png` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/logos/TopTierElectrical_Primary_FlatGold_2048.png` | PORT_WITH_ADAPTATION | `assets/images/TopTierElectrical_Primary_FlatGold_2048.png` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/logos/TopTierElectrical_Primary_FlatGold_4096.png` | PORT_WITH_ADAPTATION | `assets/images/TopTierElectrical_Primary_FlatGold_4096.png` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/logos/TopTierElectrical_Primary_FlatGold_512.png` | PORT_WITH_ADAPTATION | `assets/images/TopTierElectrical_Primary_FlatGold_512.png` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/logos/TopTierElectrical_Primary_White_2048.png` | PORT_WITH_ADAPTATION | `assets/images/TopTierElectrical_Primary_White_2048.png` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/logos/TopTierElectrical_Primary_White_512.png` | PORT_WITH_ADAPTATION | `assets/images/TopTierElectrical_Primary_White_512.png` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/3-phase-service.jpg` | PORT_WITH_ADAPTATION | `assets/images/3-phase-service.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/480v-3-phase.jpg` | PORT_WITH_ADAPTATION | `assets/images/480v-3-phase.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/barn-photo.jpg` | PORT_WITH_ADAPTATION | `assets/images/barn-photo.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/carl.jpg` | PORT_WITH_ADAPTATION | `assets/images/carl.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/commercial-control-panel-wiring.jpg` | PORT_WITH_ADAPTATION | `assets/images/commercial-control-panel-wiring.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/conduit-piping.jpg` | PORT_WITH_ADAPTATION | `assets/images/conduit-piping.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/conduit.jpg` | PORT_WITH_ADAPTATION | `assets/images/conduit.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/control-cabinet-2.jpg` | PORT_WITH_ADAPTATION | `assets/images/control-cabinet-2.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/control-cabinet.jpg` | PORT_WITH_ADAPTATION | `assets/images/control-cabinet.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/control-work.jpg` | PORT_WITH_ADAPTATION | `assets/images/control-work.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/dust-collector-motor.jpg` | PORT_WITH_ADAPTATION | `assets/images/dust-collector-motor.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/dust-collector-system.jpg` | PORT_WITH_ADAPTATION | `assets/images/dust-collector-system.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/electrical-project-49-1200.jpg` | PORT_WITH_ADAPTATION | `assets/images/electrical-project-49-1200.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/fire-response-2.jpg` | PORT_WITH_ADAPTATION | `assets/images/fire-response-2.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/gas-station-service.jpg` | PORT_WITH_ADAPTATION | `assets/images/gas-station-service.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/generator-transfer-switch-install.jpg` | PORT_WITH_ADAPTATION | `assets/images/generator-transfer-switch-install.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/horse-stall-lighting.jpg` | PORT_WITH_ADAPTATION | `assets/images/horse-stall-lighting.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/kitchen-led.jpg` | PORT_WITH_ADAPTATION | `assets/images/kitchen-led.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/led-handrail-4.jpg` | PORT_WITH_ADAPTATION | `assets/images/led-handrail-4.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/led-handrail-5.jpg` | PORT_WITH_ADAPTATION | `assets/images/led-handrail-5.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/led-handrail.jpg` | PORT_WITH_ADAPTATION | `assets/images/led-handrail.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/led-shelfs.jpg` | PORT_WITH_ADAPTATION | `assets/images/led-shelfs.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/led-shelves.jpg` | PORT_WITH_ADAPTATION | `assets/images/led-shelves.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/logo.jpg` | PORT_WITH_ADAPTATION | `assets/images/logo.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/motor-control.jpg` | PORT_WITH_ADAPTATION | `assets/images/motor-control.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/motor.jpg` | PORT_WITH_ADAPTATION | `assets/images/motor.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/myenergi-4SyUf9MvWjU-unsplash.jpg` | PORT_WITH_ADAPTATION | `assets/images/myenergi-4SyUf9MvWjU-unsplash.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/panel-work.jpg` | PORT_WITH_ADAPTATION | `assets/images/panel-work.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/pipe-rack.jpg` | PORT_WITH_ADAPTATION | `assets/images/pipe-rack.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/piping.jpg` | PORT_WITH_ADAPTATION | `assets/images/piping.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/selenoids.jpg` | PORT_WITH_ADAPTATION | `assets/images/selenoids.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/service-after.jpg` | PORT_WITH_ADAPTATION | `assets/images/service-after.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/service-panel-upgrade-detail.jpg` | PORT_WITH_ADAPTATION | `assets/images/service-panel-upgrade-detail.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/service-upgrade-before.jpg` | PORT_WITH_ADAPTATION | `assets/images/service-upgrade-before.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/storm-emergency.jpg` | PORT_WITH_ADAPTATION | `assets/images/storm-emergency.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `assets/images/projects/transformer.jpg` | PORT_WITH_ADAPTATION | `assets/images/transformer.jpg` | Check image references, responsive loading, and Lighthouse performance. |
| `audit-deliverables.md` | REPLACE_WITH_EQUIVALENT | `audit-deliverables.md` | Confirm equivalent documentation section exists and links resolve. |
| `audit-findings.json` | REPLACE_WITH_EQUIVALENT | `audit-findings.json` | Manual review to map capability into SRC architecture. |
| `audit-report.md` | REPLACE_WITH_EQUIVALENT | `audit-report.md` | Confirm equivalent documentation section exists and links resolve. |
| `backlog.yml` | REPLACE_WITH_EQUIVALENT | `backlog.yml` | Manual review to map capability into SRC architecture. |
| `blog-electrical-safety.html` | REPLACE_WITH_EQUIVALENT | `blog-electrical-safety.html` | Manual review to map capability into SRC architecture. |
| `blog-ev-charging.html` | REPLACE_WITH_EQUIVALENT | `blog-ev-charging.html` | Manual review to map capability into SRC architecture. |
| `blog-generator-readiness.html` | REPLACE_WITH_EQUIVALENT | `blog-generator-readiness.html` | Manual review to map capability into SRC architecture. |
| `blog-panel-upgrade-signs.html` | REPLACE_WITH_EQUIVALENT | `blog-panel-upgrade-signs.html` | Manual review to map capability into SRC architecture. |
| `blog-right-electrician.html` | REPLACE_WITH_EQUIVALENT | `blog-right-electrician.html` | Manual review to map capability into SRC architecture. |
| `blog-surge-protection.html` | REPLACE_WITH_EQUIVALENT | `blog-surge-protection.html` | Manual review to map capability into SRC architecture. |
| `blog.html` | REPLACE_WITH_EQUIVALENT | `blog.html` | Manual review to map capability into SRC architecture. |
| `booking.html` | REPLACE_WITH_EQUIVALENT | `booking.html` | Manual review to map capability into SRC architecture. |
| `branches.txt` | REPLACE_WITH_EQUIVALENT | `branches.txt` | Manual review to map capability into SRC architecture. |
| `bundle export` | REPLACE_WITH_EQUIVALENT | `bundle export` | Manual review to map capability into SRC architecture. |
| `commercial-electrical-maintenance.html` | REPLACE_WITH_EQUIVALENT | `commercial-electrical-maintenance.html` | Manual review to map capability into SRC architecture. |
| `commercial-electrician-allegan-mi.html` | REPLACE_WITH_EQUIVALENT | `commercial-electrician-allegan-mi.html` | Manual review to map capability into SRC architecture. |
| `commercial-led-lighting-retrofit.html` | REPLACE_WITH_EQUIVALENT | `commercial-led-lighting-retrofit.html` | Manual review to map capability into SRC architecture. |
| `commercial.html` | REPLACE_WITH_EQUIVALENT | `commercial.html` | Manual review to map capability into SRC architecture. |
| `contact.html` | REPLACE_WITH_EQUIVALENT | `contact.html` | Manual review to map capability into SRC architecture. |
| `css/components.css` | REPLACE_WITH_EQUIVALENT | `css/components.css` | Manual review to map capability into SRC architecture. |
| `css/design-tokens.css` | REPLACE_WITH_EQUIVALENT | `css/design-tokens.css` | Manual review to map capability into SRC architecture. |
| `docs/CLEAN_REPO_EXPORT.md` | REPLACE_WITH_EQUIVALENT | `docs/CLEAN_REPO_EXPORT.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/CLOUDFLARE_DEPLOYMENT_NOTES.md` | REPLACE_WITH_EQUIVALENT | `docs/CLOUDFLARE_DEPLOYMENT_NOTES.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/IMAGE-SOURCES.md` | REPLACE_WITH_EQUIVALENT | `docs/IMAGE-SOURCES.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/OVERHAUL_BACKLOG.md` | REPLACE_WITH_EQUIVALENT | `docs/OVERHAUL_BACKLOG.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/RISKS_GUARDRAILS.md` | REPLACE_WITH_EQUIVALENT | `docs/RISKS_GUARDRAILS.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/VERIFICATION_PLAYBOOK.md` | REPLACE_WITH_EQUIVALENT | `docs/VERIFICATION_PLAYBOOK.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/citations-nap.md` | REPLACE_WITH_EQUIVALENT | `docs/citations-nap.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/competitive/serp-tracker.csv` | REPLACE_WITH_EQUIVALENT | `docs/competitive/serp-tracker.csv` | Confirm equivalent documentation section exists and links resolve. |
| `docs/gbp-utm.md` | REPLACE_WITH_EQUIVALENT | `docs/gbp-utm.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/kpi-weekly-scorecard.csv` | REPLACE_WITH_EQUIVALENT | `docs/kpi-weekly-scorecard.csv` | Confirm equivalent documentation section exists and links resolve. |
| `docs/launch-checklist.md` | REPLACE_WITH_EQUIVALENT | `docs/launch-checklist.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/measurement-plan.md` | REPLACE_WITH_EQUIVALENT | `docs/measurement-plan.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/ops/monthly.md` | REPLACE_WITH_EQUIVALENT | `docs/ops/monthly.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/ops/quarterly.md` | REPLACE_WITH_EQUIVALENT | `docs/ops/quarterly.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/ops/weekly.md` | REPLACE_WITH_EQUIVALENT | `docs/ops/weekly.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/ops/workflow-control-matrix.md` | REPLACE_WITH_EQUIVALENT | `docs/ops/workflow-control-matrix.md` | Confirm equivalent documentation section exists and links resolve. |
| `docs/seo/keyword-map.yml` | REPLACE_WITH_EQUIVALENT | `docs/seo/keyword-map.yml` | Confirm equivalent documentation section exists and links resolve. |
| `electrical-design-consultation.html` | REPLACE_WITH_EQUIVALENT | `electrical-design-consultation.html` | Manual review to map capability into SRC architecture. |
| `electrical-repairs.html` | REPLACE_WITH_EQUIVALENT | `electrical-repairs.html` | Manual review to map capability into SRC architecture. |
| `electrician-ada.html` | REPLACE_WITH_EQUIVALENT | `electrician-ada.html` | Manual review to map capability into SRC architecture. |
| `electrician-allegan.html` | REPLACE_WITH_EQUIVALENT | `electrician-allegan.html` | Manual review to map capability into SRC architecture. |
| `electrician-grand-rapids.html` | REPLACE_WITH_EQUIVALENT | `electrician-grand-rapids.html` | Manual review to map capability into SRC architecture. |
| `electrician-holland.html` | REPLACE_WITH_EQUIVALENT | `electrician-holland.html` | Manual review to map capability into SRC architecture. |
| `electrician-hudsonville.html` | REPLACE_WITH_EQUIVALENT | `electrician-hudsonville.html` | Manual review to map capability into SRC architecture. |
| `electrician-zeeland.html` | REPLACE_WITH_EQUIVALENT | `electrician-zeeland.html` | Manual review to map capability into SRC architecture. |
| `emergency.html` | REPLACE_WITH_EQUIVALENT | `emergency.html` | Manual review to map capability into SRC architecture. |
| `energy-consulting.html` | REPLACE_WITH_EQUIVALENT | `energy-consulting.html` | Manual review to map capability into SRC architecture. |
| `energy-solutions.html` | REPLACE_WITH_EQUIVALENT | `energy-solutions.html` | Manual review to map capability into SRC architecture. |
| `ev-chargers.html` | REPLACE_WITH_EQUIVALENT | `ev-chargers.html` | Manual review to map capability into SRC architecture. |
| `faq.html` | REPLACE_WITH_EQUIVALENT | `faq.html` | Manual review to map capability into SRC architecture. |
| `financing.html` | REPLACE_WITH_EQUIVALENT | `financing.html` | Manual review to map capability into SRC architecture. |
| `gallery.html` | REPLACE_WITH_EQUIVALENT | `gallery.html` | Manual review to map capability into SRC architecture. |
| `generators.html` | REPLACE_WITH_EQUIVALENT | `generators.html` | Manual review to map capability into SRC architecture. |
| `img-0733-69955aad77cc2.webp` | PORT_WITH_ADAPTATION | `assets/images/img-0733-69955aad77cc2.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `implementation_packets/01_home.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/01_home.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/02_services.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/02_services.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/03_panel-upgrades.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/03_panel-upgrades.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/04_ev-chargers.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/04_ev-chargers.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/05_lighting.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/05_lighting.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/06_electrical-repairs.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/06_electrical-repairs.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/07_generators.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/07_generators.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/08_energy-solutions.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/08_energy-solutions.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/09_energy-consulting.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/09_energy-consulting.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/10_service-areas.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/10_service-areas.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/11_contact.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/11_contact.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/12_booking.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/12_booking.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/13_testimonials.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/13_testimonials.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/14_financing.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/14_financing.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/15_emergency.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/15_emergency.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/16_gallery.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/16_gallery.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/17_faq.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/17_faq.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/18_blog.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/18_blog.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/19_blog-electrical-safety.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/19_blog-electrical-safety.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/20_blog-right-electrician.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/20_blog-right-electrician.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/21_blog-ev-charging.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/21_blog-ev-charging.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/22_blog-surge-protection.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/22_blog-surge-protection.md` | Confirm equivalent documentation section exists and links resolve. |
| `implementation_packets/23_facebook-alignment.md` | REPLACE_WITH_EQUIVALENT | `implementation_packets/23_facebook-alignment.md` | Confirm equivalent documentation section exists and links resolve. |
| `index.html` | REPLACE_WITH_EQUIVALENT | `index.html` | Manual review to map capability into SRC architecture. |
| `lighting.html` | REPLACE_WITH_EQUIVALENT | `lighting.html` | Manual review to map capability into SRC architecture. |
| `local-seo/citations.example.json` | REPLACE_WITH_EQUIVALENT | `local-seo/citations.example.json` | Manual review to map capability into SRC architecture. |
| `local-seo/citations.json` | REPLACE_WITH_EQUIVALENT | `local-seo/citations.json` | Manual review to map capability into SRC architecture. |
| `local-seo/gbp-profile.example.json` | REPLACE_WITH_EQUIVALENT | `local-seo/gbp-profile.example.json` | Manual review to map capability into SRC architecture. |
| `local-seo/gbp-profile.json` | REPLACE_WITH_EQUIVALENT | `local-seo/gbp-profile.json` | Manual review to map capability into SRC architecture. |
| `next.config.ts` | REPLACE_WITH_EQUIVALENT | `next.config.ts` | Manual review to map capability into SRC architecture. |
| `owner_friendly_with_dog_800.webp` | PORT_WITH_ADAPTATION | `assets/images/owner_friendly_with_dog_800.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `package-lock.json` | REPLACE_WITH_EQUIVALENT | `package-lock.json` | Manual review to map capability into SRC architecture. |
| `package.json` | REPLACE_WITH_EQUIVALENT | `package.json` | Manual review to map capability into SRC architecture. |
| `panel-upgrades.html` | REPLACE_WITH_EQUIVALENT | `panel-upgrades.html` | Manual review to map capability into SRC architecture. |
| `reports/.gitkeep` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/AUDIT_ZERO_UPDATE_VERIFICATION.md` | REPLACE_WITH_EQUIVALENT | `reports/AUDIT_ZERO_UPDATE_VERIFICATION.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/BASELINE_URL_INVENTORY.csv` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/BYTE_LEVEL_REPO_AUDIT.json` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/BYTE_LEVEL_REPO_AUDIT.md` | REPLACE_WITH_EQUIVALENT | `reports/BYTE_LEVEL_REPO_AUDIT.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/BYTE_VERIFICATION_2026-02-10.md` | REPLACE_WITH_EQUIVALENT | `reports/BYTE_VERIFICATION_2026-02-10.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/CI_VERIFICATION_2026-02-14.md` | REPLACE_WITH_EQUIVALENT | `reports/CI_VERIFICATION_2026-02-14.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/DOUBLE_CHECK_COMPLETION_2026-02-08.md` | REPLACE_WITH_EQUIVALENT | `reports/DOUBLE_CHECK_COMPLETION_2026-02-08.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/EXECUTIVE_DEVELOPER_MODE_AUDIT_2026-02-08.md` | REPLACE_WITH_EQUIVALENT | `reports/EXECUTIVE_DEVELOPER_MODE_AUDIT_2026-02-08.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/FORMS_BASELINE.md` | REPLACE_WITH_EQUIVALENT | `reports/FORMS_BASELINE.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/FULL_AUDIT_CONTINUOUS_SWEEP_2026-02-15.md` | REPLACE_WITH_EQUIVALENT | `reports/FULL_AUDIT_CONTINUOUS_SWEEP_2026-02-15.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/FULL_AUDIT_CONTINUOUS_SWEEP_2026-02-16.md` | REPLACE_WITH_EQUIVALENT | `reports/FULL_AUDIT_CONTINUOUS_SWEEP_2026-02-16.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/FULL_STACK_BYTE_AUDIT_2026-02-10.md` | REPLACE_WITH_EQUIVALENT | `reports/FULL_STACK_BYTE_AUDIT_2026-02-10.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/FULL_VERIFICATION_SWEEP_2026-02-15.md` | REPLACE_WITH_EQUIVALENT | `reports/FULL_VERIFICATION_SWEEP_2026-02-15.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/IMAGE_INVENTORY_LOCAL.csv` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/IMAGE_INVENTORY_LOCAL.md` | REPLACE_WITH_EQUIVALENT | `reports/IMAGE_INVENTORY_LOCAL.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/IMAGE_LOCATION_TEXT_AUDIT_2026-02-15.md` | REPLACE_WITH_EQUIVALENT | `reports/IMAGE_LOCATION_TEXT_AUDIT_2026-02-15.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/IMAGE_LOCATION_VERIFICATION_2026-02-13.md` | REPLACE_WITH_EQUIVALENT | `reports/IMAGE_LOCATION_VERIFICATION_2026-02-13.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/IMAGE_LOCATION_VERIFICATION_2026-02-14_SWEEPS.md` | REPLACE_WITH_EQUIVALENT | `reports/IMAGE_LOCATION_VERIFICATION_2026-02-14_SWEEPS.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/IMAGE_TEXT_REFERENCE_AUDIT.md` | REPLACE_WITH_EQUIVALENT | `reports/IMAGE_TEXT_REFERENCE_AUDIT.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/LIGHTHOUSE_BASELINE.md` | REPLACE_WITH_EQUIVALENT | `reports/LIGHTHOUSE_BASELINE.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/LINKCHECK_BASELINE.md` | REPLACE_WITH_EQUIVALENT | `reports/LINKCHECK_BASELINE.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/MARKETING_OCD_AUDIT_2026-02-06.md` | REPLACE_WITH_EQUIVALENT | `reports/MARKETING_OCD_AUDIT_2026-02-06.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/MASTER_IMPROVEMENT_LIST_2026-02-10.md` | REPLACE_WITH_EQUIVALENT | `reports/MASTER_IMPROVEMENT_LIST_2026-02-10.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/MASTER_IMPROVEMENT_LIST_2026-02-10_REFRESH.md` | REPLACE_WITH_EQUIVALENT | `reports/MASTER_IMPROVEMENT_LIST_2026-02-10_REFRESH.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/NAV_BASELINE.md` | REPLACE_WITH_EQUIVALENT | `reports/NAV_BASELINE.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/PROCEDURE_ACCURACY_VERIFICATION_2026-02-08.md` | REPLACE_WITH_EQUIVALENT | `reports/PROCEDURE_ACCURACY_VERIFICATION_2026-02-08.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/PR_RECREATION_ZERO_ERRORS_2026-02-14.md` | REPLACE_WITH_EQUIVALENT | `reports/PR_RECREATION_ZERO_ERRORS_2026-02-14.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/QA_GATE_FIX_VERIFICATION_2026-02-15.md` | REPLACE_WITH_EQUIVALENT | `reports/QA_GATE_FIX_VERIFICATION_2026-02-15.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/REDIRECTS_ERRORS_HOST_CANONICALISATION_AUDIT.md` | REPLACE_WITH_EQUIVALENT | `reports/REDIRECTS_ERRORS_HOST_CANONICALISATION_AUDIT.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/REDIRECT_CODE_AUDIT.md` | REPLACE_WITH_EQUIVALENT | `reports/REDIRECT_CODE_AUDIT.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/SYSTEM_AUDIT_IMPLEMENTATION_RESOLUTION_2026-02-08.md` | REPLACE_WITH_EQUIVALENT | `reports/SYSTEM_AUDIT_IMPLEMENTATION_RESOLUTION_2026-02-08.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/URL_INVENTORY_LOCAL.csv` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/URL_INVENTORY_LOCAL.md` | REPLACE_WITH_EQUIVALENT | `reports/URL_INVENTORY_LOCAL.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/VP_DEVELOPMENT_SYSTEM_AUDIT_2026-02-08.md` | REPLACE_WITH_EQUIVALENT | `reports/VP_DEVELOPMENT_SYSTEM_AUDIT_2026-02-08.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/brand-system-cloudflare-audit.md` | REPLACE_WITH_EQUIVALENT | `reports/brand-system-cloudflare-audit.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/crawl_raw.json` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/implementation-report.md` | REPLACE_WITH_EQUIVALENT | `reports/implementation-report.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/newestupdate-implementation.md` | REPLACE_WITH_EQUIVALENT | `reports/newestupdate-implementation.md` | Confirm equivalent documentation section exists and links resolve. |
| `reports/verification/headers-apex-home.txt` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/verification/headers-apex-sitemap.txt` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/verification/headers-http-www-home.txt` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/verification/headers-robots.txt` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/verification/headers-www-contact.txt` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/verification/headers-www-home.txt` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/verification/headers-www-services.txt` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/verification/headers-www-sitemap.txt` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/verification/robots.txt` | INTENTIONALLY_OMIT | `(none; generated artifact)` | No runtime verification needed; regenerate on demand. |
| `reports/workflow-performance-verification.md` | REPLACE_WITH_EQUIVALENT | `reports/workflow-performance-verification.md` | Confirm equivalent documentation section exists and links resolve. |
| `residential-electrician-allegan-mi.html` | REPLACE_WITH_EQUIVALENT | `residential-electrician-allegan-mi.html` | Manual review to map capability into SRC architecture. |
| `residential.html` | REPLACE_WITH_EQUIVALENT | `residential.html` | Manual review to map capability into SRC architecture. |
| `robots.txt` | REPLACE_WITH_EQUIVALENT | `robots.txt` | Manual review to map capability into SRC architecture. |
| `script.js` | REPLACE_WITH_EQUIVALENT | `script.js` | Manual review to map capability into SRC architecture. |
| `scripts/audit-image-text-references.js` | PORT_AS_IS | `scripts/audit-image-text-references.js` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/audit-images.mjs` | PORT_AS_IS | `scripts/audit-images.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/audit-links-cloudflare.mjs` | PORT_AS_IS | `scripts/audit-links-cloudflare.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/build.mjs` | PORT_AS_IS | `scripts/build.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-content-mapping.js` | PORT_AS_IS | `scripts/check-content-mapping.js` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-extensionless-collisions.mjs` | PORT_AS_IS | `scripts/check-extensionless-collisions.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-extensionless-links.mjs` | PORT_AS_IS | `scripts/check-extensionless-links.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-image-sources.js` | PORT_AS_IS | `scripts/check-image-sources.js` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-navigation-sim.mjs` | PORT_AS_IS | `scripts/check-navigation-sim.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-navigation-simulation.js` | PORT_AS_IS | `scripts/check-navigation-simulation.js` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-no-binary-files.sh` | PORT_AS_IS | `scripts/check-no-binary-files.sh` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-origin-redirects.js` | PORT_AS_IS | `scripts/check-origin-redirects.js` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-origin-redirects.mjs` | PORT_AS_IS | `scripts/check-origin-redirects.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-placeholders.js` | PORT_AS_IS | `scripts/check-placeholders.js` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-placeholders.mjs` | PORT_AS_IS | `scripts/check-placeholders.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-redirects-cloudflare.mjs` | PORT_AS_IS | `scripts/check-redirects-cloudflare.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-workflow-location.js` | PORT_AS_IS | `scripts/check-workflow-location.js` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/check-workflow-yaml.mjs` | PORT_AS_IS | `scripts/check-workflow-yaml.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/clean.mjs` | PORT_AS_IS | `scripts/clean.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/crawl.js` | PORT_AS_IS | `scripts/crawl.js` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/create-clean-repo.mjs` | PORT_AS_IS | `scripts/create-clean-repo.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/dev.mjs` | PORT_AS_IS | `scripts/dev.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/gsc-gap.mjs` | PORT_AS_IS | `scripts/gsc-gap.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/lib/fs.mjs` | PORT_AS_IS | `scripts/lib/fs.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/lib/images.mjs` | PORT_AS_IS | `scripts/lib/images.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/lib/meta.mjs` | PORT_AS_IS | `scripts/lib/meta.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/lib/template.mjs` | PORT_AS_IS | `scripts/lib/template.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/lib/urls.mjs` | PORT_AS_IS | `scripts/lib/urls.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/lib/validate.mjs` | PORT_AS_IS | `scripts/lib/validate.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/local-seo-audit.ts` | PORT_AS_IS | `scripts/local-seo-audit.ts` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/optimize-assets.mjs` | PORT_AS_IS | `scripts/optimize-assets.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/savage-audit-all-branches.sh` | PORT_AS_IS | `scripts/savage-audit-all-branches.sh` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/savage-audit.sh` | PORT_AS_IS | `scripts/savage-audit.sh` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/seo-quality-gates.mjs` | PORT_AS_IS | `scripts/seo-quality-gates.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/verify-formspree-forms.mjs` | PORT_AS_IS | `scripts/verify-formspree-forms.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/verify-full-sweep.mjs` | PORT_AS_IS | `scripts/verify-full-sweep.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/verify-stability.mjs` | PORT_AS_IS | `scripts/verify-stability.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/verify-zero-updates.mjs` | PORT_AS_IS | `scripts/verify-zero-updates.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/verify.mjs` | PORT_AS_IS | `scripts/verify.mjs` | Execute script and verify non-zero exit on failing fixtures. |
| `scripts/with-chrome-path.sh` | PORT_AS_IS | `scripts/with-chrome-path.sh` | Execute script and verify non-zero exit on failing fixtures. |
| `service-areas.html` | REPLACE_WITH_EQUIVALENT | `service-areas.html` | Manual review to map capability into SRC architecture. |
| `services.html` | REPLACE_WITH_EQUIVALENT | `services.html` | Manual review to map capability into SRC architecture. |
| `sitemap.xml` | REPLACE_WITH_EQUIVALENT | `sitemap.xml` | Manual review to map capability into SRC architecture. |
| `styleguide-top-tier-electrical.html` | REPLACE_WITH_EQUIVALENT | `styleguide-top-tier-electrical.html` | Manual review to map capability into SRC architecture. |
| `styles.css` | REPLACE_WITH_EQUIVALENT | `styles.css` | Manual review to map capability into SRC architecture. |
| `switch-gear-69955ab06fdb5.webp` | PORT_WITH_ADAPTATION | `assets/images/switch-gear-69955ab06fdb5.webp` | Check image references, responsive loading, and Lighthouse performance. |
| `testimonials.html` | REPLACE_WITH_EQUIVALENT | `testimonials.html` | Manual review to map capability into SRC architecture. |
| `thank-you.html` | REPLACE_WITH_EQUIVALENT | `thank-you.html` | Manual review to map capability into SRC architecture. |
| `tools/center_and_pad_logo.py` | REPLACE_WITH_EQUIVALENT | `tools/center_and_pad_logo.py` | Manual review to map capability into SRC architecture. |
| `toptier-service-pages/services/commercial-electrical/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/commercial-electrical/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `toptier-service-pages/services/custom-home-new-construction/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/custom-home-new-construction/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `toptier-service-pages/services/ev-charger-installation/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/ev-charger-installation/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `toptier-service-pages/services/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `toptier-service-pages/services/industrial-equipment-power/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/industrial-equipment-power/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `toptier-service-pages/services/lighting-design-installation/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/lighting-design-installation/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `toptier-service-pages/services/low-voltage-structured-cabling/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/low-voltage-structured-cabling/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `toptier-service-pages/services/panel-service-upgrades/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/panel-service-upgrades/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `toptier-service-pages/services/residential-remodels-additions/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/residential-remodels-additions/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `toptier-service-pages/services/service-calls-troubleshooting/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/service-calls-troubleshooting/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `toptier-service-pages/services/specialty-systems-walkins-rtus/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/specialty-systems-walkins-rtus/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `toptier-service-pages/services/standby-generators/index.md` | REPLACE_WITH_EQUIVALENT | `toptier-service-pages/services/standby-generators/index.md` | Confirm equivalent documentation section exists and links resolve. |
| `wrangler.jsonc` | PORT_AS_IS | `wrangler.jsonc` | Validate deploy + route/header behavior in preview. |
| `wrangler.toml` | PORT_AS_IS | `wrangler.toml` | Validate deploy + route/header behavior in preview. |

#### EXTRA_IN_SRC decisions (exhaustive)

| relpath | explanation |
|---|---|
| `assets/css/styles.css` | SRC static asset pipeline divergence (expected in source-oriented tree). |
| `assets/js/site.js` | SRC static asset pipeline divergence (expected in source-oriented tree). |
| `components/HeroImage.tsx` | SRC source architecture (expected alternate-root structure). |
| `components/analytics/Track.tsx` | SRC source architecture (expected alternate-root structure). |
| `components/cta/CallTextCTA.tsx` | SRC source architecture (expected alternate-root structure). |
| `components/forms/LeadForm.tsx` | SRC source architecture (expected alternate-root structure). |
| `components/seo/Breadcrumbs.tsx` | SRC source architecture (expected alternate-root structure). |
| `components/seo/JsonLd.tsx` | SRC source architecture (expected alternate-root structure). |
| `config/pages.ts` | SRC source architecture (expected alternate-root structure). |
| `config/services.ts` | SRC source architecture (expected alternate-root structure). |
| `config/site.ts` | SRC source architecture (expected alternate-root structure). |
| `data/site.json` | SRC source architecture (expected alternate-root structure). |
| `lib/analytics/events.ts` | SRC source architecture (expected alternate-root structure). |
| `lib/marketing/utm.ts` | SRC source architecture (expected alternate-root structure). |
| `lib/seo/metadata.ts` | SRC source architecture (expected alternate-root structure). |
| `lib/seo/schema.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/audit.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/citations.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/date.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/fetch.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/format.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/gbp.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/parse.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/repo.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/rules.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/score.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/thresholds.ts` | SRC source architecture (expected alternate-root structure). |
| `local-seo/types.ts` | SRC source architecture (expected alternate-root structure). |
| `pages/about.html` | SRC source architecture (expected alternate-root structure). |
| `pages/blog/electrical-safety-tips/index.html` | SRC source architecture (expected alternate-root structure). |
| `pages/blog/ev-charger-installation-guide/index.html` | SRC source architecture (expected alternate-root structure). |
| `pages/blog/how-to-choose-right-electrician/index.html` | SRC source architecture (expected alternate-root structure). |
| `pages/blog/index.html` | SRC source architecture (expected alternate-root structure). |
| `pages/blog/signs-you-need-panel-upgrade/index.html` | SRC source architecture (expected alternate-root structure). |
| `pages/blog/whole-home-surge-protection/index.html` | SRC source architecture (expected alternate-root structure). |
| `pages/blog/winter-generator-readiness/index.html` | SRC source architecture (expected alternate-root structure). |
| `pages/booking.html` | SRC source architecture (expected alternate-root structure). |
| `pages/code-corrections.html` | SRC source architecture (expected alternate-root structure). |
| `pages/commercial.html` | SRC source architecture (expected alternate-root structure). |
| `pages/contact.html` | SRC source architecture (expected alternate-root structure). |
| `pages/dedicated-circuits.html` | SRC source architecture (expected alternate-root structure). |
| `pages/electrical-repairs.html` | SRC source architecture (expected alternate-root structure). |
| `pages/electrician-allegan.html` | SRC source architecture (expected alternate-root structure). |
| `pages/electrician-grand-haven.html` | SRC source architecture (expected alternate-root structure). |
| `pages/electrician-grand-rapids.html` | SRC source architecture (expected alternate-root structure). |
| `pages/electrician-holland.html` | SRC source architecture (expected alternate-root structure). |
| `pages/electrician-muskegon.html` | SRC source architecture (expected alternate-root structure). |
| `pages/emergency.html` | SRC source architecture (expected alternate-root structure). |
| `pages/ev-chargers.html` | SRC source architecture (expected alternate-root structure). |
| `pages/faq.html` | SRC source architecture (expected alternate-root structure). |
| `pages/financing.html` | SRC source architecture (expected alternate-root structure). |
| `pages/gallery.html` | SRC source architecture (expected alternate-root structure). |
| `pages/generators.html` | SRC source architecture (expected alternate-root structure). |
| `pages/index.html` | SRC source architecture (expected alternate-root structure). |
| `pages/lighting.html` | SRC source architecture (expected alternate-root structure). |
| `pages/panel-upgrades.html` | SRC source architecture (expected alternate-root structure). |
| `pages/residential.html` | SRC source architecture (expected alternate-root structure). |
| `pages/reviews.html` | SRC source architecture (expected alternate-root structure). |
| `pages/service-areas.html` | SRC source architecture (expected alternate-root structure). |
| `pages/services.html` | SRC source architecture (expected alternate-root structure). |
| `pages/testimonials.html` | SRC source architecture (expected alternate-root structure). |
| `pages/thank-you.html` | SRC source architecture (expected alternate-root structure). |
| `partials/footer.html` | SRC source architecture (expected alternate-root structure). |
| `partials/header.html` | SRC source architecture (expected alternate-root structure). |
| `partials/includes/cta-call-inline.html` | SRC source architecture (expected alternate-root structure). |
| `partials/includes/cta-emergency-call.html` | SRC source architecture (expected alternate-root structure). |
| `partials/includes/cta-hero-dual.html` | SRC source architecture (expected alternate-root structure). |
| `partials/includes/decision-cta.html` | SRC source architecture (expected alternate-root structure). |
| `partials/includes/gbp-review-button.html` | SRC source architecture (expected alternate-root structure). |
| `partials/layout.html` | SRC source architecture (expected alternate-root structure). |

### B.3 Heuristic correspondence section (mandatory due CHANGED=0)

#### Mapping Table (TOP 50 fuzzy correspondences)

| root_relpath | src_relpath | score | decision | evidence_filenames |
|---|---|---:|---|---|
| `testimonials.html` | `pages/testimonials.html` | 1.2811 | PORT_WITH_ADAPTATION | `fuzzy_diffs/testimonials.html__TO__pages_testimonials.html.diff`; `fuzzy_byte_diffs/testimonials.html__TO__pages_testimonials.html.cmp.txt` |
| `residential.html` | `pages/residential.html` | 0.6272 | PORT_WITH_ADAPTATION | `fuzzy_diffs/residential.html__TO__pages_residential.html.diff`; `fuzzy_byte_diffs/residential.html__TO__pages_residential.html.cmp.txt` |
| `commercial.html` | `pages/commercial.html` | 0.5799 | PORT_WITH_ADAPTATION | `fuzzy_diffs/commercial.html__TO__pages_commercial.html.diff`; `fuzzy_byte_diffs/commercial.html__TO__pages_commercial.html.cmp.txt` |
| `thank-you.html` | `pages/thank-you.html` | 0.5343 | PORT_WITH_ADAPTATION | `fuzzy_diffs/thank-you.html__TO__pages_thank-you.html.diff`; `fuzzy_byte_diffs/thank-you.html__TO__pages_thank-you.html.cmp.txt` |
| `about.html` | `pages/about.html` | 0.5122 | PORT_WITH_ADAPTATION | `fuzzy_diffs/about.html__TO__pages_about.html.diff`; `fuzzy_byte_diffs/about.html__TO__pages_about.html.cmp.txt` |
| `financing.html` | `pages/financing.html` | 0.5057 | PORT_WITH_ADAPTATION | `fuzzy_diffs/financing.html__TO__pages_financing.html.diff`; `fuzzy_byte_diffs/financing.html__TO__pages_financing.html.cmp.txt` |
| `faq.html` | `pages/faq.html` | 0.4456 | PORT_WITH_ADAPTATION | `fuzzy_diffs/faq.html__TO__pages_faq.html.diff`; `fuzzy_byte_diffs/faq.html__TO__pages_faq.html.cmp.txt` |
| `contact.html` | `pages/contact.html` | 0.4394 | PORT_WITH_ADAPTATION | `fuzzy_diffs/contact.html__TO__pages_contact.html.diff`; `fuzzy_byte_diffs/contact.html__TO__pages_contact.html.cmp.txt` |
| `generators.html` | `pages/generators.html` | 0.4379 | PORT_WITH_ADAPTATION | `fuzzy_diffs/generators.html__TO__pages_generators.html.diff`; `fuzzy_byte_diffs/generators.html__TO__pages_generators.html.cmp.txt` |
| `electrician-holland.html` | `pages/electrician-holland.html` | 0.4373 | PORT_WITH_ADAPTATION | `fuzzy_diffs/electrician-holland.html__TO__pages_electrician-holland.html.diff`; `fuzzy_byte_diffs/electrician-holland.html__TO__pages_electrician-holland.html.cmp.txt` |
| `ev-chargers.html` | `pages/ev-chargers.html` | 0.4350 | PORT_WITH_ADAPTATION | `fuzzy_diffs/ev-chargers.html__TO__pages_ev-chargers.html.diff`; `fuzzy_byte_diffs/ev-chargers.html__TO__pages_ev-chargers.html.cmp.txt` |
| `booking.html` | `pages/booking.html` | 0.4342 | PORT_WITH_ADAPTATION | `fuzzy_diffs/booking.html__TO__pages_booking.html.diff`; `fuzzy_byte_diffs/booking.html__TO__pages_booking.html.cmp.txt` |
| `emergency.html` | `pages/emergency.html` | 0.4286 | PORT_WITH_ADAPTATION | `fuzzy_diffs/emergency.html__TO__pages_emergency.html.diff`; `fuzzy_byte_diffs/emergency.html__TO__pages_emergency.html.cmp.txt` |
| `electrical-repairs.html` | `pages/electrical-repairs.html` | 0.4243 | PORT_WITH_ADAPTATION | `fuzzy_diffs/electrical-repairs.html__TO__pages_electrical-repairs.html.diff`; `fuzzy_byte_diffs/electrical-repairs.html__TO__pages_electrical-repairs.html.cmp.txt` |
| `electrician-grand-rapids.html` | `pages/electrician-grand-rapids.html` | 0.4228 | PORT_WITH_ADAPTATION | `fuzzy_diffs/electrician-grand-rapids.html__TO__pages_electrician-grand-rapids.html.diff`; `fuzzy_byte_diffs/electrician-grand-rapids.html__TO__pages_electrician-grand-rapids.html.cmp.txt` |
| `electrician-allegan.html` | `pages/electrician-allegan.html` | 0.4214 | PORT_WITH_ADAPTATION | `fuzzy_diffs/electrician-allegan.html__TO__pages_electrician-allegan.html.diff`; `fuzzy_byte_diffs/electrician-allegan.html__TO__pages_electrician-allegan.html.cmp.txt` |
| `gallery.html` | `pages/gallery.html` | 0.4209 | PORT_WITH_ADAPTATION | `fuzzy_diffs/gallery.html__TO__pages_gallery.html.diff`; `fuzzy_byte_diffs/gallery.html__TO__pages_gallery.html.cmp.txt` |
| `service-areas.html` | `pages/service-areas.html` | 0.4109 | PORT_WITH_ADAPTATION | `fuzzy_diffs/service-areas.html__TO__pages_service-areas.html.diff`; `fuzzy_byte_diffs/service-areas.html__TO__pages_service-areas.html.cmp.txt` |
| `lighting.html` | `pages/lighting.html` | 0.4107 | PORT_WITH_ADAPTATION | `fuzzy_diffs/lighting.html__TO__pages_lighting.html.diff`; `fuzzy_byte_diffs/lighting.html__TO__pages_lighting.html.cmp.txt` |
| `index.html` | `pages/index.html` | 0.4103 | PORT_WITH_ADAPTATION | `fuzzy_diffs/index.html__TO__pages_index.html.diff`; `fuzzy_byte_diffs/index.html__TO__pages_index.html.cmp.txt` |
| `panel-upgrades.html` | `pages/panel-upgrades.html` | 0.4089 | PORT_WITH_ADAPTATION | `fuzzy_diffs/panel-upgrades.html__TO__pages_panel-upgrades.html.diff`; `fuzzy_byte_diffs/panel-upgrades.html__TO__pages_panel-upgrades.html.cmp.txt` |
| `services.html` | `pages/services.html` | 0.3842 | PORT_WITH_ADAPTATION | `fuzzy_diffs/services.html__TO__pages_services.html.diff`; `fuzzy_byte_diffs/services.html__TO__pages_services.html.cmp.txt` |
| `Past_work_webp/Lighting.webp` | `pages/lighting.html` | 0.3739 | PORT_WITH_ADAPTATION | `fuzzy_diffs/Past_work_webp_Lighting.webp__TO__pages_lighting.html.diff`; `fuzzy_byte_diffs/Past_work_webp_Lighting.webp__TO__pages_lighting.html.cmp.txt` |

#### Top correspondences transplant detail
- `testimonials.html` → `pages/testimonials.html` (score 1.2811)
  - Transplant exactly: page metadata blocks, testimonial content sections, CTA/link destinations, and any structured data blocks present in root page.
  - Behavior change: align SRC rendered page content/SEO with ROOT artifact.
  - Risks: template mismatch or duplicated markup; run HTML/link validation and visual spot-check.
  - Evidence: `fuzzy_diffs/testimonials.html__TO__pages_testimonials.html.diff`, `fuzzy_byte_diffs/testimonials.html__TO__pages_testimonials.html.cmp.txt`.
- `residential.html` → `pages/residential.html` (score 0.6272)
  - Transplant exactly: page metadata blocks, testimonial content sections, CTA/link destinations, and any structured data blocks present in root page.
  - Behavior change: align SRC rendered page content/SEO with ROOT artifact.
  - Risks: template mismatch or duplicated markup; run HTML/link validation and visual spot-check.
  - Evidence: `fuzzy_diffs/residential.html__TO__pages_residential.html.diff`, `fuzzy_byte_diffs/residential.html__TO__pages_residential.html.cmp.txt`.
- `commercial.html` → `pages/commercial.html` (score 0.5799)
  - Transplant exactly: page metadata blocks, testimonial content sections, CTA/link destinations, and any structured data blocks present in root page.
  - Behavior change: align SRC rendered page content/SEO with ROOT artifact.
  - Risks: template mismatch or duplicated markup; run HTML/link validation and visual spot-check.
  - Evidence: `fuzzy_diffs/commercial.html__TO__pages_commercial.html.diff`, `fuzzy_byte_diffs/commercial.html__TO__pages_commercial.html.cmp.txt`.
- `thank-you.html` → `pages/thank-you.html` (score 0.5343)
  - Transplant exactly: page metadata blocks, testimonial content sections, CTA/link destinations, and any structured data blocks present in root page.
  - Behavior change: align SRC rendered page content/SEO with ROOT artifact.
  - Risks: template mismatch or duplicated markup; run HTML/link validation and visual spot-check.
  - Evidence: `fuzzy_diffs/thank-you.html__TO__pages_thank-you.html.diff`, `fuzzy_byte_diffs/thank-you.html__TO__pages_thank-you.html.cmp.txt`.
- `about.html` → `pages/about.html` (score 0.5122)
  - Transplant exactly: page metadata blocks, testimonial content sections, CTA/link destinations, and any structured data blocks present in root page.
  - Behavior change: align SRC rendered page content/SEO with ROOT artifact.
  - Risks: template mismatch or duplicated markup; run HTML/link validation and visual spot-check.
  - Evidence: `fuzzy_diffs/about.html__TO__pages_about.html.diff`, `fuzzy_byte_diffs/about.html__TO__pages_about.html.cmp.txt`.
- `financing.html` → `pages/financing.html` (score 0.5057)
  - Transplant exactly: page metadata blocks, testimonial content sections, CTA/link destinations, and any structured data blocks present in root page.
  - Behavior change: align SRC rendered page content/SEO with ROOT artifact.
  - Risks: template mismatch or duplicated markup; run HTML/link validation and visual spot-check.
  - Evidence: `fuzzy_diffs/financing.html__TO__pages_financing.html.diff`, `fuzzy_byte_diffs/financing.html__TO__pages_financing.html.cmp.txt`.
- `faq.html` → `pages/faq.html` (score 0.4456)
  - Transplant exactly: page metadata blocks, testimonial content sections, CTA/link destinations, and any structured data blocks present in root page.
  - Behavior change: align SRC rendered page content/SEO with ROOT artifact.
  - Risks: template mismatch or duplicated markup; run HTML/link validation and visual spot-check.
  - Evidence: `fuzzy_diffs/faq.html__TO__pages_faq.html.diff`, `fuzzy_byte_diffs/faq.html__TO__pages_faq.html.cmp.txt`.
- `contact.html` → `pages/contact.html` (score 0.4394)
  - Transplant exactly: page metadata blocks, testimonial content sections, CTA/link destinations, and any structured data blocks present in root page.
  - Behavior change: align SRC rendered page content/SEO with ROOT artifact.
  - Risks: template mismatch or duplicated markup; run HTML/link validation and visual spot-check.
  - Evidence: `fuzzy_diffs/contact.html__TO__pages_contact.html.diff`, `fuzzy_byte_diffs/contact.html__TO__pages_contact.html.cmp.txt`.
- `generators.html` → `pages/generators.html` (score 0.4379)
  - Transplant exactly: page metadata blocks, testimonial content sections, CTA/link destinations, and any structured data blocks present in root page.
  - Behavior change: align SRC rendered page content/SEO with ROOT artifact.
  - Risks: template mismatch or duplicated markup; run HTML/link validation and visual spot-check.
  - Evidence: `fuzzy_diffs/generators.html__TO__pages_generators.html.diff`, `fuzzy_byte_diffs/generators.html__TO__pages_generators.html.cmp.txt`.
- `electrician-holland.html` → `pages/electrician-holland.html` (score 0.4373)
  - Transplant exactly: page metadata blocks, testimonial content sections, CTA/link destinations, and any structured data blocks present in root page.
  - Behavior change: align SRC rendered page content/SEO with ROOT artifact.
  - Risks: template mismatch or duplicated markup; run HTML/link validation and visual spot-check.
  - Evidence: `fuzzy_diffs/electrician-holland.html__TO__pages_electrician-holland.html.diff`, `fuzzy_byte_diffs/electrician-holland.html__TO__pages_electrician-holland.html.cmp.txt`.

## C. Repo-level transplant plan

- PR1: Deploy/runtime parity (`wrangler.*`, `_headers`, `_redirects`, `.well-known/security.txt`).
- PR2: CI/CD parity (`.github/workflows/*` with environment protections).
- PR3: Functional parity (`app/api/leads/route.ts`, selected `scripts/*.mjs`).
- PR4: Content convergence using fuzzy mapping candidates and manual review.

Risk matrix:
- High: API behavior, redirects/deploy settings.
- Medium: workflow migration and SEO/script gating.
- Low: documentation and generated-report handling.

Definition-of-done checklist:
- [ ] Exact counts trend in desired direction after each PR.
- [ ] Each transplanted item has test/build evidence.
- [ ] Deploy preview + prod workflows emit observable statuses.
- [ ] All “needs manual confirmation” items resolved or explicitly waived.
