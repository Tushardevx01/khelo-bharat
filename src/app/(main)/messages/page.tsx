import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { getConversations, getConversation } from "@/actions/message.actions";
import { MessagesView } from "./_components/messages-view";
import { auth } from "@clerk/nextjs/server";
import { userService } from "@/services/user.service";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await userService.getUserByClerkId(userId);

  const params = await searchParams;
  const chatId = typeof params.chatId === "string" ? params.chatId : undefined;

  const conversations = await getConversations();
  
  let activeMessages: any[] = [];
  if (chatId) {
    activeMessages = await getConversation(chatId);
  }

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
