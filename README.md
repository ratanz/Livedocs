# LiveDocs: Real-time Collaborative Document Editor

LiveDocs is a powerful, real-time collaborative document editing platform built with modern web technologies. It offers a seamless experience for creating, editing, and sharing documents with multiple users simultaneously.

🌐 **Live Demo:** [https://livedocs-doc.vercel.app/](https://livedocs-doc.vercel.app/)

## 🚀 Features

- **Authentication**: Secure sign-in/out using Clerk authentication.
- **Real-time Collaboration**: Multiple users can edit the same document simultaneously.
- **Rich Text Editing**: Powered by Lexical Editor for a smooth writing experience.
- **Document Management**:
  - Create new documents
  - Delete owned documents
  - Share documents with customizable permissions
  - List and search documents
- **Commenting System**: Add inline and general comments with threading support.
- **Active Collaborators**: See who's currently editing the document in real-time.
- **Notifications**: Stay updated on document shares, new comments, and collaborator activities.
- **Responsive Design**: Works seamlessly across all devices.

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Liveblocks](https://liveblocks.io/)
- [Lexical Editor](https://lexical.dev/)
- [ShadCN](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.com/)

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

* Git
* Node.js
* npm (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/adrianhajdin/collaborative-editor.git
cd collaborative-editor
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

Create a new file named `.env` in the root of your project and add the following content:

```plaintext
#Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

#Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
LIVEBLOCKS_SECRET_KEY=
```

Replace the placeholder values with your actual Clerk & LiveBlocks credentials. You can obtain these credentials by signing up on the Clerk and Liveblocks websites.

### Running the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
