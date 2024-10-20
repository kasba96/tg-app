import Link from "next/link";

export default function Campaigns({ campaigns }) {
  if(!campaigns) {
    return null
  }
  return (
    <div className="w-full flex flex-col space-y-4 py-4">
      {campaigns.map((address) => (
        <div
          key={address}
          className="bg-white rounded-lg shadow-md p-4 text-center"
        >
          <img
            src="/palace.jpeg" // Using palace.jpeg from the public folder
            alt="Event Placeholder"
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <h3 className="text-lg font-semibold mb-2">Event Name</h3>
          <p className="text-gray-500 text-sm mb-4">
            This is a placeholder description for the event.
          </p>
          {/* Static CTA linking to /interaction */}
          <Link className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md inline-block" href="/interaction">
              Join Event
          </Link>
        </div>
      ))}
    </div>
  );
}
