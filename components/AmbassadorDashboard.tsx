'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useUser } from '@/contexts/UserContext'
import { useToast } from "@/components/ui/use-toast"

export function AmbassadorDashboard() {
  const { user } = useUser()
  const { toast } = useToast()

  const referralLink = `${window.location.origin}/signup?ref=${user?.id}`

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Referral Link Copied",
      description: "Your referral link has been copied to the clipboard.",
    })
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-electric-blue">Ambassador Program</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Your Referral Link</h3>
          <p className="text-sm text-muted-foreground mb-2">{referralLink}</p>
          <Button onClick={copyReferralLink} className="flame-button">Copy Link</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Blazecredits Wallet 🪙</h3>
          <p>Earned Blazecredits: {user?.blazecredits?.earned || 0}</p>
          <p>Redeemed Blazecredits: {user?.blazecredits?.redeemed || 0}</p>
          <p>Remaining Blazecredits: {user?.blazecredits?.remaining || 0}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Referral History</h3>
          {user?.referrals && user.referrals.length > 0 ? (
            <ul className="list-disc list-inside">
              {user.referrals.map((referral, index) => (
                <li key={index}>
                  {referral.type === 'signup' ? '5 Blazecredits for signup by ' : '10 Blazecredits for purchase by '}
                  {referral.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No referrals yet. Start sharing your link!</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
