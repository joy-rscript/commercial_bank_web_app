import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function NotificationButton() {
  return (
    <button
      type="button"
      style={{color:'white', fontWeight:'bolder'}}
      className="relative color-white rounded-full bg-primary p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span className="sr-only">View notifications</span>
      <EnvelopeIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
