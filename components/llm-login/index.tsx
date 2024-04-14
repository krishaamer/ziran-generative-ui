import { signInWithGoogle } from "./authActions";

export default function SignIn() {
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await signInWithGoogle();
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
