import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OtherSettingsForm() {
  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "utc-8",
    newsletter: true,
  })

  return (
    <div className="space-y-6">
      {/* Language & Localization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Language & Localization</CardTitle>
          <CardDescription>Customize your language and regional settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select
                value={preferences.language}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, language: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Timezone</label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc-8">UTC-8 (PST)</SelectItem>
                  <SelectItem value="utc-5">UTC-5 (EST)</SelectItem>
                  <SelectItem value="utc+0">UTC+0 (GMT)</SelectItem>
                  <SelectItem value="utc+1">UTC+1 (CET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={preferences.newsletter}
                onChange={(e) => setPreferences((prev) => ({ ...prev, newsletter: e.target.checked }))}
                className="h-4 w-4 rounded border-border"
              />
              <span className="text-sm font-medium">Subscribe to newsletter</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Danger Zone */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
