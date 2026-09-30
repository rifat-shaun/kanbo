import { useParams } from 'react-router'
import { getSettingsSectionLabel } from '../data/settingsSections'

// TODO: the actual settings forms
export const SettingsSectionPage = () => {
  const { settingsSection } = useParams()

  return <p className="p-6 text-fg-3">{getSettingsSectionLabel(settingsSection)} settings go here.</p>
}
