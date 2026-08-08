import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { getConversations, getConversation } from "@/actions/message.actions";
import { MessagesView } from "./_components/messages-view";
import { requireCurrentUser } from "@/lib/auth";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const user = await requireCurrentUser();

  const params = await searchParams;
  const chatId = typeof params.chatId === "string" ? params.chatId : undefined;

  const conversations = await getConversations();
  
  const activeMessages = chatId ? await getConversation(chatId) : [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Messages"
          description="Communicate with coaches, sponsors, and athletes."
        />

        <MessagesView 
          conversations={conversations} 
          activeChatId={chatId} 
          activeMessages={activeMessages} 
          currentUserId={user.id} 
        />
      </div>
    </DashboardLayout>
  );
}
