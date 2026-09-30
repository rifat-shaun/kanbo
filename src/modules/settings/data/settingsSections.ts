export const SETTINGS_SECTIONS: Record<string, string> = {
  general: 'General',
  members: 'Members',
  'api-keys': 'API keys',
  webhooks: 'Webhooks',
  billing: 'Billing',
  profile: 'Profile & preferences',
}

export const getSettingsSectionLabel = (section = '') => SETTINGS_SECTIONS[section] ?? section
