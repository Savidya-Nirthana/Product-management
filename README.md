# Product Management Dashboard

A modern, highly responsive Product Management Dashboard built for the Full Stack Intern Assessment. 
This application allows users to seamlessly add, view, edit, and delete products entirely within the browser securely using Local Storage.

## Tech Stack Used
- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4
- **Components:** Shadcn/UI (Radix UI primitives)
- **Icons:** Lucide React
- **State Management:** Custom React Hooks (`useLocalStorage`)
- **Routing:** Next.js Dynamic App Routing

## Run Locally

1. **Clone the Repository**
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd <YOUR_REPO_NAME>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **View Application**
   Open your browser and navigate to `http://localhost:3000`.

## Features Implemented
- **Full CRUD Support:** Add, View, Edit, and Delete elements flawlessly.
- **Local Storage Persistence:** Custom hydration hooks prevent SSR mismatches while storing image Base64 buffers and data arrays natively without a backend.
- **Client-Side Image Uploads:** Converts raw uploaded files natively into Base64 blob strings directly using the browser's `FileReader` API.
- **Dynamic Filtering:** Search by name, or filter seamlessly by Category and Price Bracket.
- **Responsive Theme:** Clean light and dark modes securely tracked via `next-themes`.
- **Global Toast System:** Custom animated Toast context provider to display non-intrusive success/error confirmation popups natively.

## Assumptions & Future Improvements
- **Backend Setup:** Assuming a zero-backend environment per assessment restrictions, Images are stored locally as Base64 strings. Large Base64 encodings can technically max out the 5MB browser Local Storage limit faster than plain text. A real-world improvement would involve a backend AWS S3 file uploader mechanism.
- **Pagination Strategy:** Data is paginated actively on the client side since the entire database loads at once. In a full-stack iteration, offset/limit pagination would be offloaded directly into SQL queries to preserve bandwidth.
