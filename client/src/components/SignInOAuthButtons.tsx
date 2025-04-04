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
    return <Button onClick={signInWithGoogle} className="w-full text-black borde-zinc-200 h-11 bg-green-500">
        Get Started
    </Button>
}

export default SignInOAuthButtons