/* eslint-disable @typescript-eslint/no-unused-vars */
import SignInOAuthButtons from '@/components/SignInOAuthButtons'
import { SignedOut, SignedIn,SignOutButton } from '@clerk/clerk-react'
import React from 'react'

const OnboardingPage = () => {
    return (
        <div>

                {/* <SignedIn>
                    <SignOutButton />
                </SignedIn> */}
            <SignedOut >
                <SignInOAuthButtons />
            </SignedOut>
        </div>
    )
}

export default OnboardingPage