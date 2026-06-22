import { createParsedCompletion } from "@anvia/core"
import { openAIModel } from "./utils"
import z from "zod"

const meeting_transcript = `# Project Status Meeting - Harvest Tracker Rollout

**Date:** June 18, 2026

**Participants:**
- John (Project Manager)
- Sarah (Operations Manager)
- Michael (Engineering Lead)
- David (Infrastructure Lead)
- Lisa (Business Analyst)
- Robert (Regional Plantation Manager)

---

## Meeting Transcript

**John:**
Good morning everyone. The purpose of today's meeting is to review the readiness of the Harvest Tracker rollout scheduled for next month. We've completed the pilot in Estate A and Estate B, but there are still concerns around device availability, network coverage, and user training.

**Sarah:**
From an operations perspective, the pilot went relatively well. Most harvesters were able to carry the tracking cards throughout the workday. However, compliance was lower than expected during the second week. Approximately 18% of harvesters forgot to bring their devices back to the collection point after work.

**Robert:**
That's correct. We also noticed that some supervisors started keeping spare devices because they anticipated losses. While that helped daily operations, it created inventory tracking issues because we no longer knew which device belonged to which harvester.

**Lisa:**
I think that inventory problem could become significant during full deployment. If devices are swapped informally between workers, our location reports may no longer represent actual personnel movement.

**Michael:**
The software can technically support dynamic assignment, but the current workflow assumes one device per worker. Implementing reassignment tracking would require changes to both the mobile application and backend services.

**John:**
How large would that effort be?

**Michael:**
Rough estimate is about three weeks of development plus one week of testing.

**John:**
That's longer than I expected.

**Michael:**
Partly because we also need to update the reporting dashboards. Otherwise managers would see inconsistent ownership histories.

---

**David:**
I want to bring up another concern. During the pilot, we relied on a temporary LoRaWAN gateway installed at the estate office. Signal quality was acceptable within approximately three kilometers, but several harvesting blocks exceeded that distance.

**Sarah:**
Were those areas completely disconnected?

**David:**
Not completely. The trackers continued storing data locally. However, synchronization only occurred when workers returned near the office.

**Robert:**
Actually, that's acceptable for most operational use cases. We don't require real-time tracking. Management mainly wants to understand harvesting routes at the end of the day.

**Lisa:**
Then perhaps we should officially redefine the project objective. Several stakeholders still assume this is a real-time monitoring solution.

**John:**
That's a good point. If expectations are misaligned, we'll face complaints even if the system technically works as designed.

---

**Michael:**
There is another issue. Battery consumption was higher than predicted. We expected five days of operation, but actual performance averaged around three and a half days.

**Sarah:**
That's concerning. What caused it?

**Michael:**
We're still investigating. One theory is that GPS acquisition takes longer under dense tree cover. The devices may be spending more energy attempting location fixes.

**David:**
I agree. The logs show unusually high GPS activity in several plantation blocks.

**Robert:**
If battery life drops below three days, field operations will struggle. Charging hundreds of devices every night would require additional infrastructure.

---

**Lisa:**
Speaking of infrastructure, have we finalized the budget for additional charging stations?

**John:**
Not yet. Finance requested a revised estimate because the original proposal assumed fewer replacement devices.

**Sarah:**
Replacement devices are definitely needed. During the six-week pilot, twelve trackers were damaged and seven were lost.

**David:**
The loss rate is higher than what the vendor projected.

**Robert:**
Some losses are unavoidable. Harvesters work in difficult terrain and occasionally leave equipment in transport vehicles.

---

**John:**
Let's discuss rollout timing. The original target was July 15th. Based on everything we've heard today, is that still realistic?

**Michael:**
If reassignment tracking becomes mandatory, no.

**David:**
If we maintain the current scope, infrastructure can be ready by July 15th.

**Sarah:**
Training is my biggest concern. We still have not trained supervisors in three estates.

**Lisa:**
Training materials are only partially translated into local languages as well.

**John:**
What would be a safer target date?

**Sarah:**
Early August.

**Michael:**
I would support August 10th.

**David:**
That gives infrastructure teams additional buffer time.

---

**John:**
Let's talk about reporting requirements. Senior management requested daily route summaries, worker attendance validation, and productivity analytics.

**Michael:**
Attendance validation is already implemented.

**Lisa:**
Route summaries are implemented too.

**Michael:**
Productivity analytics are only partially complete. We can estimate harvested area coverage, but not actual harvested tonnage.

**Robert:**
Tonnage estimation is important. Estate managers frequently use that metric for performance reviews.

**Michael:**
That would require integration with the weighing system.

**John:**
Do we have a timeline for that integration?

**Michael:**
Not before Q4.

**John:**
Then we should avoid committing to tonnage analytics during phase one.

---

**Sarah:**
I also want to mention user feedback. Many harvesters appreciated not having to manually record routes. However, some expressed privacy concerns because they believed management was monitoring their location continuously.

**Lisa:**
That supports the earlier point about stakeholder communication.

**Robert:**
We need a clear communication campaign before deployment.

**John:**
Agreed.

---

**David:**
One final risk: the vendor informed us that the next shipment of tracking devices may be delayed by two to four weeks due to component shortages.

**Sarah:**
That could affect rollout significantly.

**John:**
How many devices are currently available?

**David:**
Approximately 620.

**Sarah:**
Full deployment requires around 900.

**John:**
So we are short by nearly 280 units.

**David:**
Correct.

**Michael:**
Could we prioritize high-production estates first?

**Robert:**
Operationally, yes. But some estate managers may object if they are excluded from phase one.

---

**John:**
Okay, let me summarize. We need to decide whether to delay the rollout, reduce scope, or proceed with a phased deployment.

**Sarah:**
My recommendation is phased deployment.

**David:**
I agree.

**Michael:**
Same here.

**Lisa:**
As long as expectations are clearly communicated.

**Robert:**
No objections from operations.

**John:**
Alright. We'll proceed with phased deployment starting August 10th, focusing first on the estates with sufficient device inventory. Reassignment tracking will be postponed to a later phase. Lisa will prepare stakeholder communications and updated project objectives. David will validate gateway coverage and confirm inventory numbers. Sarah will complete supervisor training plans. Michael will provide a revised roadmap for analytics and future integrations.

**Meeting adjourned.**
`

const MeetingResultSchema = z.object({
    decision: z.string(),
    risk: z.string(),
    action_items: z.string()
})

const parsedRes = await createParsedCompletion(openAIModel, {
    instructions: "Analyze the meeting transcript and extract all Decisions, Risks, and Action Items. Return the result in JSON format, and for each item include a short description, owner (if mentioned), and supporting evidence from the transcript.",
    input: meeting_transcript,
    schema: MeetingResultSchema
})

console.log(parsedRes.data)