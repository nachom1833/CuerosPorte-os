export async function verifySessionToken(token: string | undefined): Promise<{ email: string; uid: string } | null> {
    if (!token) return null;

    try {
        const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCQkv-uSNWHCotMzZUoc6XHvwn82r2-G10"

        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken: token }),
                // Cache option to avoid re-fetching on the same request context
                cache: "no-store",
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            console.error("Firebase accounts:lookup REST API failed:", errText);
            return null;
        }

        const data = await response.json();
        const user = data.users?.[0];
        if (user) {
            return {
                email: user.email,
                uid: user.localId,
            };
        }
    } catch (error) {
        console.error("Error verifying Firebase session token:", error);
    }
    return null;
}
