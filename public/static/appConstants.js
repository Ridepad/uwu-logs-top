const BOSSES = {
  'Icecrown Citadel': [
    'The Lich King',
    'Lord Marrowgar', 'Lady Deathwhisper', 'Gunship', 'Deathbringer Saurfang',
    'Festergut', 'Rotface', 'Professor Putricide',
    'Blood Prince Council', "Blood-Queen Lana'thel",
    'Valithria Dreamwalker', 'Sindragosa'
  ],
  'The Ruby Sanctum': ['Halion', 'Baltharus the Warborn', 'General Zarithrian', 'Saviana Ragefire'],
  'Trial of the Crusader': ["Anub'arak", 'Northrend Beasts', 'Lord Jaraxxus', 'Faction Champions', "Twin Val'kyr"],
  'Vault of Archavon': ['Toravon the Ice Watcher', 'Archavon the Stone Watcher', 'Emalon the Storm Watcher', 'Koralon the Flame Watcher'],
  "Onyxia's Lair": ['Onyxia'],
  'The Eye of Eternity': ['Malygos'],
  'The Obsidian Sanctum': ['Sartharion'],
  // 'Naxxramas': [
  //   "Anub'Rekhan", 'Grand Widow Faerlina', 'Maexxna', 'Noth the Plaguebringer', 'Heigan the Unclean',
  //   'Loatheb', 'Patchwerk', 'Grobbulus', 'Gluth', 'Thaddius', 'Instructor Razuvious', 'Gothik the Harvester',
  //   'The Four Horsemen', 'Sapphiron', "Kel'Thuzad"
  // ],
  // 'Ulduar': [
  //   'Flame Leviathan', 'Ignis the Furnace Master', 'Razorscale', 'XT-002 Deconstructor',
  //   'Assembly of Iron', 'Kologarn', 'Auriaya', 'Hodir', 'Thorim', 'Freya', 'Mimiron',
  //   'General Vezax', 'Yogg-Saron', 'Algalon the Observer'
  // ],
};

const SPECS = [
  ["Death Knight", "class_deathknight", "death-knight"],
  ["Blood", "spell_deathknight_bloodpresence", "death-knight"],
  ["Frost", "spell_deathknight_frostpresence", "death-knight"],
  ["Unholy", "spell_deathknight_unholypresence", "death-knight"],
  ["Druid", "class_druid", "druid"],
  ["Balance", "spell_nature_starfall", "druid"],
  ["Feral Combat", "ability_racial_bearform", "druid"],
  ["Restoration", "spell_nature_healingtouch", "druid"],
  ["Hunter", "class_hunter", "hunter"],
  ["Beast Mastery", "ability_hunter_beasttaming", "hunter"],
  ["Marksmanship", "ability_marksmanship", "hunter"],
  ["Survival", "ability_hunter_swiftstrike", "hunter"],
  ["Mage", "class_mage", "mage"],
  ["Arcane", "spell_holy_magicalsentry", "mage"],
  ["Fire", "spell_fire_firebolt02", "mage"],
  ["Frost", "spell_frost_frostbolt02", "mage"],
  ["Paladin", "class_paladin", "paladin"],
  ["Holy", "spell_holy_holybolt", "paladin"],
  ["Protection", "spell_holy_devotionaura", "paladin"],
  ["Retribution", "spell_holy_auraoflight", "paladin"],
  ["Priest", "class_priest", "priest"],
  ["Discipline", "spell_holy_wordfortitude", "priest"],
  ["Holy", "spell_holy_guardianspirit", "priest"],
  ["Shadow", "spell_shadow_shadowwordpain", "priest"],
  ["Rogue", "class_rogue", "rogue"],
  ["Assassination", "ability_rogue_eviscerate", "rogue"],
  ["Combat", "ability_backstab", "rogue"],
  ["Subtlety", "ability_stealth", "rogue"],
  ["Shaman", "class_shaman", "shaman"],
  ["Elemental", "spell_nature_lightning", "shaman"],
  ["Enhancement", "spell_nature_lightningshield", "shaman"],
  ["Restoration", "spell_nature_magicimmunity", "shaman"],
  ["Warlock", "class_warlock", "warlock"],
  ["Affliction", "spell_shadow_deathcoil", "warlock"],
  ["Demonology", "spell_shadow_metamorphosis", "warlock"],
  ["Destruction", "spell_shadow_rainoffire", "warlock"],
  ["Warrior", "class_warrior", "warrior"],
  ["Arms", "ability_rogue_eviscerate", "warrior"],
  ["Fury", "ability_warrior_innerrage", "warrior"],
  ["Protection", "ability_warrior_defensivestance", "warrior"]
]

const SIZES = [25, 10];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CLASSES = ['Death Knight', 'Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior']

const SPECS_SELECT_OPTIONS = {
  "Death Knight": ["Blood", "Frost", "Unholy"],
  "Druid": ["Balance", "Feral Combat", "Restoration"],
  "Hunter": ["Beast Mastery", "Marksmanship", "Survival"],
  "Mage": ["Arcane", "Fire", "Frost"],
  "Paladin": ["Holy", "Protection", "Retribution"],
  "Priest": ["Discipline", "Holy", "Shadow"],
  "Rogue": ["Assassination", "Combat", "Subtlety"],
  "Shaman": ["Elemental", "Enhancement", "Restoration"],
  "Warlock": ["Affliction", "Demonology", "Destruction"],
  "Warrior": ["Arms", "Fury", "Protection"]
}
const ICON_CDN_LINK = "https://wotlk.evowow.com/static/images/wow/icons/large";

const AURAS_ICONS = {
  57933: "ability_rogue_tricksofthetrade",
  10060: "spell_holy_powerinfusion",
  49016: "spell_deathknight_bladedarmor",
  23060: "inv_misc_birdbeck_01",
  2825: "spell_nature_bloodlust",
  32182: "ability_shaman_heroism",
  54646: "spell_arcane_studentofmagic",
  29166: "spell_nature_lightning",
  63848: "ability_rogue_hungerforblood",
  51800: "inv_misc_head_dragon_blue",
  72553: "achievement_boss_festergutrotface",
  71533: "ability_warlock_improvedsoulleech",
  71531: "ability_warlock_improvedsoulleech",
  67108: "ability_mage_netherwindpresence",
  67215: "spell_shadow_darkritual",
  67218: "spell_holy_searinglightpriest",
  53908: "inv_alchemy_elixir_04",
  53909: "inv_alchemy_elixir_01",
  28494: "inv_potion_109",
  28507: "inv_potion_108",
  53762: "inv_alchemy_elixir_empty",
  28714: "inv_misc_herb_flamecap",
  54758: "spell_shaman_elementaloath",
  46352: "inv_summerfest_fireflower",
  26393: "inv_misc_gem_pearl_02",
  49856: "inv_inscription_inkpurple03",
  49857: "inv_inscription_inkpurple04",
  49858: "inv_inscription_inkpurple02",
  49861: "inv_inscription_inkgreen02",
  49860: "inv_inscription_inkgreen04",
  49859: "inv_inscription_inkgreen03",
  29332: "inv_misc_food_11",
  29333: "inv_misc_food_53",
  29334: "inv_summerfest_smorc",
  48889: "inv_misc_orb_05",
  48891: "inv_misc_gem_pearl_06",
  48892: "inv_misc_slime_01"
}


export {
  BOSSES,
  SIZES,
  SPECS,
  MONTHS,
  CLASSES,
  SPECS_SELECT_OPTIONS,
  ICON_CDN_LINK,
  AURAS_ICONS,
}