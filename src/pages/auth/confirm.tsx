import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import Layout from "@/components/Layout";

export default function ConfirmEmail() {
  const router = useRouter();
  const [status, setStatus] = useState("Confirming your email…");
  const [email, setEmail] = useState("");        // store user email for resend
  const [resendMsg, setResendMsg] = useState(""); // success/error messages
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const handleConfirmation = async () => {
      // Check for a valid session (if user clicked a confirmation link)
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setStatus("Invalid or expired confirmation link.");
        return;
      }

      // Save email so we can allow resending if user needs it
      setEmail(data.session.user?.email ?? "");

      // If session is valid, redirect to profile setup
      setStatus("Email confirmed! Redirecting…");
      router.replace("/profile/setup");
    };

    handleConfirmation();
  }, [router]);

  // Resend confirmation email
  const handleResend = async () => {
    if (!email) {
      setResendMsg("No email found to resend confirmation.");
      return;
    }
    setSending(true);
    setResendMsg("");

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    setSending(false);
    if (error) {
      setResendMsg(`Error: ${error.message}`);
    } else {
      setResendMsg(`Confirmation email resent to ${email}`);
    }
  };

  return (
    <Layout title="Email Confirmation">
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <p className="text-lg text-gray-700">{status}</p>

        {/* Show resend button only if session is not valid */}
        {status.startsWith("Invalid") && (
          <>
            <button
              onClick={handleResend}
              disabled={sending}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50"
            >
              {sending ? "Resending…" : "Resend Confirmation Email"}
            </button>
            {resendMsg && (
              <p className="text-sm text-gray-600 text-center">{resendMsg}</p>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
