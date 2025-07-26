import React from 'react'

function CookiePolicy() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
        <p className="mb-6 text-gray-700">
            <strong>Note:</strong> <span className='text-red-500'> This application is currently under development. The following Cookie Policy is provided as a placeholder for demonstration purposes only and is not legally binding.</span>
        </p>
        <ol className="list-decimal pl-6 space-y-4 text-gray-800">
            <li>
                <span className="font-semibold">What Are Cookies?</span><br />
                Cookies are small text files that are stored on your device to help the application function properly and improve user experience. This demo does not currently use real cookies for tracking or personalization.
            </li>
            <li>
                <span className="font-semibold">How We Use Cookies</span><br />
                In the final version of this application, cookies may be used to remember preferences, track user behavior, or enable certain features. However, no actual cookies are in use at this time.
            </li>
            <li>
                <span className="font-semibold">Types of Cookies</span>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><span className="font-semibold">Essential Cookies:</span> Required for basic functionality.</li>
                    <li><span className="font-semibold">Performance Cookies:</span> Help us understand usage patterns (future feature).</li>
                    <li><span className="font-semibold">Functional Cookies:</span> Remember user preferences (not active yet).</li>
                </ul>
            </li>
            <li>
                <span className="font-semibold">Managing Cookies</span><br />
                In a real application, users would be able to manage or disable cookies through browser settings or an in-app preference center. This feature will be available post-development.
            </li>
            <li>
                <span className="font-semibold">Third-Party Cookies</span><br />
                We may use third-party tools or services in the future that set their own cookies. For now, no third-party cookies are present or active in this demo.
            </li>
            <li>
                <span className="font-semibold">Changes to This Policy</span><br />
                As the application is still in development, the Cookie Policy will be updated accordingly. This version is a placeholder only.
            </li>
            <li>
                <span className="font-semibold">Contact</span><br />
                If you have questions about cookies or how they will be implemented, please contact the development team.
            </li>
        </ol>
    </div>
  )
}

export default CookiePolicy