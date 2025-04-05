/* eslint-disable @typescript-eslint/no-unused-vars */
import SignInOAuthButtons from '@/components/SignInOAuthButtons'
import { SignedOut} from '@clerk/clerk-react'

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