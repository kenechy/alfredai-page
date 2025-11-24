import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      select: {
        id: true,
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
        referrer: true,
        userAgent: true,
        createdAt: true,
      },
    });

    // Group statistics
    const stats = {
      total: leads.length,
      withUTM: leads.filter((l) => l.utmSource !== null).length,
      withoutUTM: leads.filter((l) => l.utmSource === null).length,
      bySource: leads.reduce(
        (acc, lead) => {
          const source = lead.utmSource || "direct";
          acc[source] = (acc[source] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      byDevice: leads.reduce(
        (acc, lead) => {
          const device = lead.deviceType || "unknown";
          acc[device] = (acc[device] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
    };

    return NextResponse.json({
      success: true,
      stats,
      leads,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch leads",
      },
      { status: 500 }
    );
  }
}
