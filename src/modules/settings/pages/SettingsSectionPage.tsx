import { useParams } from 'react-router'
import { PageHeader } from '@/modules/app-shell'

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export const SettingsSectionPage = () => {
  const { settingsSection = '' } = useParams()

  return <PageHeader title={capitalize(settingsSection)} />
}
