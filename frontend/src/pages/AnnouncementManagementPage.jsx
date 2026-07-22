import { useState } from "react";
import AnnouncementForm from "../components/AnnouncementForm";
import AnnouncementPage from "../components/AnnouncementPage";
import announcementData from "../data/announcementData";

export default function AnnouncementManagementPage() {
  const [announcements, setAnnouncements] = useState(announcementData);

  const publishAnnouncement = (announcement) => {
    setAnnouncements((currentAnnouncements) => [
      {
        ...announcement,
        id: crypto.randomUUID(),
      },
      ...currentAnnouncements,
    ]);
  };

  const deleteAnnouncement = (announcementId) => {
    setAnnouncements((currentAnnouncements) =>
      currentAnnouncements.filter(
        (announcement) => announcement.id !== announcementId,
      ),
    );
  };

  return (
    <main className="space-y-6">
      <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
          Community communication
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
          Announcement Management
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
          Create, publish, review, and remove announcements for system users.
        </p>
      </header>

      <AnnouncementForm onSubmit={publishAnnouncement} />
      <AnnouncementPage
        announcements={announcements}
        onDelete={deleteAnnouncement}
      />
    </main>
  );
}
