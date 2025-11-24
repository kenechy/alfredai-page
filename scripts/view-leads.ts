import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function viewLeads() {
  console.log("\n📊 Recent Leads with UTM Tracking Data\n");
  console.log("=".repeat(120));

  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    select: {
      name: true,
      email: true,
      company: true,
      utmSource: true,
      utmMedium: true,
      utmCampaign: true,
      source: true,
      ip: true,
      deviceType: true,
      country: true,
      createdAt: true,
    },
  });

  if (leads.length === 0) {
    console.log("No leads found in database.");
    return;
  }

  console.log(`\nFound ${leads.length} leads:\n`);

  leads.forEach((lead, index) => {
    console.log(`${index + 1}. ${lead.name} (${lead.email}) - ${lead.company}`);
    console.log(`   UTM Source:   ${lead.utmSource || "❌ NULL (direct traffic)"}`);
    console.log(`   UTM Medium:   ${lead.utmMedium || "❌ NULL"}`);
    console.log(`   UTM Campaign: ${lead.utmCampaign || "❌ NULL"}`);
    console.log(`   Source:       ${lead.source}`);
    console.log(`   IP Address:   ${lead.ip || "unknown"}`);
    console.log(`   Device:       ${lead.deviceType || "unknown"}`);
    console.log(`   Country:      ${lead.country || "❌ NULL (could not determine)"}`);
    console.log(`   Created:      ${lead.createdAt.toISOString()}`);
    console.log("-".repeat(120));
  });

  console.log("\n✨ Summary:");
  const withUtm = leads.filter((l) => l.utmSource !== null).length;
  const withoutUtm = leads.length - withUtm;
  console.log(`   Leads with UTM tracking: ${withUtm}`);
  console.log(`   Leads without UTM (direct): ${withoutUtm}`);

  // Group by source
  const sourceCount = leads.reduce(
    (acc, lead) => {
      const source = lead.utmSource || "direct";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  console.log("\n📈 Leads by Source:");
  Object.entries(sourceCount)
    .sort(([, a], [, b]) => b - a)
    .forEach(([source, count]) => {
      console.log(`   ${source}: ${count}`);
    });

  console.log("\n");
}

viewLeads()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
