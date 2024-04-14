"use client";
import { signInWithGoogle } from "./authActions";

export default function SignIn() {
  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await signInWithGoogle();
        }}
      >
        <button type="submit">用 Google 登入</button>
      </form>
    </>
  );
}
