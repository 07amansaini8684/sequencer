import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button"

const SignInOAuthButtons = () => {
    const { signIn, isLoaded } = useSignIn()
    if (!isLoaded) return null

    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback"
        })
    }
    return <Button onClick={signInWithGoogle} className="bg-transparent hover:bg-zinc-900 cursor-pointer">
        Get Started
    </Button>
}

export default SignInOAuthButtons