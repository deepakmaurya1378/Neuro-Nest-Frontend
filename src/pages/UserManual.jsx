
const UserManual = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl">
        <div className="p-6">
    
          <h1 className="text-4xl font-bold text-center mb-6">User Manual for Therapy App</h1>
          <p className="text-lg text-center mb-12">
            Welcome to the Our Therapy Application! This manual will guide you through all the features and how to use the app effectively.
          </p>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Table of Contents</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li><a href="#getting-started" className="text-blue-600 hover:underline">Getting Started</a></li>
              <li><a href="#client-dashboard" className="text-blue-600 hover:underline">Client Dashboard Overview</a></li>
              <li><a href="#therapist-dashboard" className="text-blue-600 hover:underline">Therapist Dashboard Overview</a></li>
              <li><a href="#general-features" className="text-blue-600 hover:underline">General Features</a></li>
              <li><a href="#faq" className="text-blue-600 hover:underline">FAQs</a></li>
              <li><a href="#contact" className="text-blue-600 hover:underline">Support & Contact</a></li>
            </ul>
          </div>

          <section id="getting-started">
            <h2 className="text-2xl font-semibold mt-12">1. Getting Started</h2>
            <p className="text-lg mt-4">
              To get started with the Therapy App, you first need to create an account and log in.
            </p>
            <h3 className="text-xl font-semibold mt-4">Creating an Account</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>Visit the <strong>Sign Up</strong> page.</li>
              <li>Choose your role: <strong>Client</strong> or <strong>Therapist</strong>.</li>
              <li>Fill in your details (Name, Email, Password, Role).</li>
              <li>Click <strong>Register</strong> to create your account.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4">Logging In</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>Go to the <strong>Login</strong> page.</li>
              <li>Enter your <strong>Email</strong> and <strong>Password</strong>.</li>
              <li>Click <strong>Submit</strong> to log in.</li>
              <li>If you forgot your password, click on the <strong>Forgot Password</strong> link to reset it.</li>
            </ul>
          </section>

          <section id="client-dashboard">
            <h2 className="text-2xl font-semibold mt-12">2. Client Dashboard Overview</h2>
            <h3 className="text-xl font-semibold mt-4">Emotion Journal</h3>
            <p className="text-lg mt-2">
              The Emotion Journal helps you track your feelings. To use it:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Go to the <strong>Emotion Journal</strong> section.</li>
              <li>Click on <strong>Add New Entry</strong> to record your emotions for the day.</li>
              <li>Select relevant emotion tags and rate your mood.</li>
              <li>Save your entry and view past journal entries in the <strong>History</strong> section.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4">Booking Sessions</h3>
            <p className="text-lg mt-2">
              To book a session with a therapist:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Go to the <strong>Sessions</strong> section.</li>
              <li>Click <strong>Book a New Session</strong>.</li>
              <li>Select a therapist and a time slot.</li>
              <li>Confirm your session booking.</li>
            </ul>
          </section>

          <section id="therapist-dashboard">
            <h2 className="text-2xl font-semibold mt-12">3. Therapist Dashboard Overview</h2>
            <h3 className="text-xl font-semibold mt-4">Managing Sessions</h3>
            <p className="text-lg mt-2">
              Therapists can manage client sessions from the dashboard.
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Go to the <strong>Sessions</strong> section.</li>
              <li>View your upcoming and past sessions.</li>
              <li>Click on a session to make updates or mark it as completed.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4">Chat with Clients</h3>
            <p className="text-lg mt-2">
              You can communicate with your clients directly through the <strong>Chat</strong> section.
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Go to the <strong>Messages</strong> section.</li>
              <li>Click on a client to start or continue a conversation.</li>
              <li>Send messages, reminders, or share session notes with clients.</li>
            </ul>
          </section>

          <section id="general-features">
            <h2 className="text-2xl font-semibold mt-12">4. General Features</h2>
            <h3 className="text-xl font-semibold mt-4">Notifications</h3>
            <p className="text-lg mt-2">
              You will receive notifications for upcoming sessions, journal updates, and messages on your email.
            </p>

            <h3 className="text-xl font-semibold mt-4">Profile Settings</h3>
            <p className="text-lg mt-2">
              You can update your personal details or therapist through the Profile Settings.
            </p>
          </section>

          <section id="faq">
            <h2 className="text-2xl font-semibold mt-12">5. FAQs</h2>
            <h3 className="text-xl font-semibold mt-4">How do I change my password?</h3>
            <p className="text-lg mt-2">
              Go to <strong>Settings</strong> <strong>Change Password</strong>. Enter your old and new password.
            </p>

            <h3 className="text-xl font-semibold mt-4">What if I can’t find a therapist?</h3>
            <p className="text-lg mt-2">
              You can search using filters or contact support for assistance.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-2xl font-semibold mt-12">6. Support & Contact</h2>
            <p className="text-lg mt-2">
              If you have any questions, feel free to reach out to us:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Email: <strong>support@therapyapp.com</strong></li>
              <li>Phone: <strong>+1 234 567 890</strong></li>
            </ul>
            <p className="mt-4">
              Visit our <strong>Help Center</strong> for more resources and live chat support.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserManual;
