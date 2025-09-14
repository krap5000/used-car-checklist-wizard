// Used Car Checklist Wizard – Full App (Vehicle Info → All Sections from Excel → Summary)
// Auto-generated from your Excel v16. Text is included verbatim.

import { useMemo, useState } from "react";

type VehicleInfo = {
  make: string;
  model: string;
  year: string;
  vin: string;
  odometer: string;
  askingPrice: string;
  sellerName: string;
  phone: string;
  cityState: string;
  listingUrl: string;
};

type FirstCallAnswer = { id: string; question: string; expected?: string; answer: string };
type ScoredAnswer = { id: string; number: string; question: string; expected?: string; score?: number; notes?: string };
type Section =
  { number: string; title: string; items: Array<{ id: string; number: string; question: string; expected?: string }> };
const WIZARD_SECTIONS: Section[] = [
  {
    "number": "1",
    "title": "First Call to Seller",
    "items": [
      {
        "id": "q_1_1",
        "number": "1.1",
        "question": "When calling the seller, say I am calling about your car for sale.",
        "expected": "Check if they ask which car which would indiacte they may be a dealer not a private seller."
      },
      {
        "id": "q_1_2",
        "number": "1.2",
        "question": "Ask how long have you had the car (if not in the ad).",
        "expected": "Is he second or third owner or original owner. They could lie so be careful."
      },
      {
        "id": "q_1_3",
        "number": "1.3",
        "question": "Ask has it been in the shop last year and why  (if not in the ad).",
        "expected": "If it is for timing belt, brake, transmission replacement that is good depending on mileage."
      },
      {
        "id": "q_1_4",
        "number": "1.4",
        "question": "Ask When was the emission testing done when is the registration (if not in the ad).",
        "expected": "It should be recent"
      },
      {
        "id": "q_1_5",
        "number": "1.5",
        "question": "Ask do you have all the service, maintenance records  (if not in the ad).",
        "expected": "If yes, that is a good thing. Use the table for if this mileage car is best based on the answer of whether he has or does not have service records."
      },
      {
        "id": "q_1_6",
        "number": "1.6",
        "question": "Ask why you are selling it.  (if not in the ad).",
        "expected": "Try to feel out if they are selling it because it doesn't work anymore or because they genuinely need a bigger or newer car"
      },
      {
        "id": "q_1_7",
        "number": "1.7",
        "question": "Ask if you come by and find a major issue not described in the ad, would they be willing to negotiate?",
        "expected": "Feel it out. If he says yes, does it mean the seller is flexible and is it because he knows there is an issue. If he says NO, is he being hardheaded or Is it because the car is really a creampuff"
      }
    ]
  },
  {
    "number": "2",
    "title": "Exterior",
    "items": [
      {
        "id": "q_2_1",
        "number": "2.1",
        "question": "Look at the car from all sides.",
        "expected": "The panels should look straight, uniform without dents or warps.\nThere should not be a variation in color\nLook for sign of rust in corners and edges towards the bottom of the car all around"
      },
      {
        "id": "q_2_2",
        "number": "2.2",
        "question": "Look at seams",
        "expected": "Panel seams should have uniform gaps on all sides.\nSeams where hood meets body shodl have uniform gap\nSeams where trunk lid meets body should have uniform gap\nSeams where doors meet body should have uniform gaps\nThe panels should be level across he seams.One panel outward or higher,  another backward backward or lower is not good."
      },
      {
        "id": "q_2_3",
        "number": "2.3",
        "question": "Check the sunroof if present.",
        "expected": "There should be a rubber gasket all around it - not brittle or worn or cracking."
      },
      {
        "id": "q_2_4",
        "number": "2.4",
        "question": "Check the windhsield and door windows",
        "expected": "There should be a rubber gasket all around these wndows - not brittle or worn or cracking."
      },
      {
        "id": "q_2_5",
        "number": "2.5",
        "question": "Check front and back bumper",
        "expected": "Check for color variations, stone chips on front bumper\nCheck for dents"
      },
      {
        "id": "q_2_6",
        "number": "2.6",
        "question": "Lightly thump headlights with closed palm",
        "expected": "The headlgihts should not shake or vibrate or move\nThe headlights should look properly set and not out of place in their slots\nHeadlights should not be yellow or foggy"
      },
      {
        "id": "q_2_7",
        "number": "2.7",
        "question": "Press doewn on the hood above each front tire as if to make the car bounce",
        "expected": "There should be only one bounce"
      },
      {
        "id": "q_2_8",
        "number": "2.8",
        "question": "Check tail lights",
        "expected": "There should be no cracks or tape\nThe tail lighjts should look properly set and not out of place in their slots\nTail lights should not be yellow or foggy"
      },
      {
        "id": "q_2_9",
        "number": "2.9",
        "question": "Open and slam close all 4 doors and trunk",
        "expected": "The doors should slam shut satisfactorily and they should fully close flush"
      },
      {
        "id": "q_2_10",
        "number": "2.10",
        "question": "Open the trunk",
        "expected": "Should not look dented or bent inside\nIt should have the jack with crank, screw drivers and L-shaped tire iron tools.\nIt should have a spare tire which should look unused\nFeel around the area under the spare tire below the carpeted cardboard. It should not be moist or have evidence of water damage.\nThe trunk lid should slam shut satisfactorily and it  should fully close flush"
      }
    ]
  },
  {
    "number": "3",
    "title": "Undercarriage",
    "items": [
      {
        "id": "q_3_1",
        "number": "3.1",
        "question": "Rub finger inside tailpipe and pull it out.",
        "expected": "There should no black soot or any kind of oily residue on your finger."
      },
      {
        "id": "q_3_2",
        "number": "3.2",
        "question": "Look under the car.",
        "expected": "There should be no dripping leaks on the ground\nThere should be no rust or cracks or gouges, dents, damage on the metal parts including bottom of doors and edges of the car body, muffler, exhaust pipe or any any other metalic struts or bars that make up the frame of the car - nor or any housings or pipes you see under the car.\nThere should be no rust in exhaust system or shock-absorber springs"
      },
      {
        "id": "q_3_3",
        "number": "3.3",
        "question": "Check tires.",
        "expected": "Good depth on treads.\nEvenly worn.\nNo gouges on the side.\nThe wheel rims where they meet the tire should not have dents or cracks or rust\ngrab each front wheen at 9 am and 3 pm and try to rotate it. It souldnt move more than  few mm."
      },
      {
        "id": "q_3_4",
        "number": "3.4",
        "question": "Check rotors discs and brake pads",
        "expected": "They should be shiny - not rusty. Tey should not ave grooves. They should be smooth. The pads should be thick."
      }
    ]
  },
  {
    "number": "4",
    "title": "Engine (pop the hood)",
    "items": [
      {
        "id": "q_4_1",
        "number": "4.1",
        "question": "Check around the engine compartment wit a flash light",
        "expected": "The engine block and surrouding wires, hoses and other componets should look clean with no deposited oil, grime or dirt. It should look dry.\nNo gunk or dirt from leaks where pipes or bolts are going into the engine\nPull on Wires and hoses. They  should feel secure - not loose, frayed, brittle or exposed\nThe front brace should look original not a replacememt part. It should not have any damage."
      },
      {
        "id": "q_4_2",
        "number": "4.2",
        "question": "Check battery and battery connections.",
        "expected": "The battery should preferably look new\nThere should be no green crud there near battey terminals."
      },
      {
        "id": "q_4_3",
        "number": "4.3",
        "question": "Check engine oil by pulling out the engine oil stick, wiping it, putting it in and pulling it out again.",
        "expected": "The oil on stick should look clean and mostly transparent - not covered with dark crud. Thew feel should not be gritty on the fingers (metal chips). No shiny metallic flakes\nSmell it. It sould not smell burnt.\nThe oil level should be at the right level\nIt should not be milky."
      },
      {
        "id": "q_4_4",
        "number": "4.4",
        "question": "Open oil refill cap.",
        "expected": "There should no black soot or crud under cap.\nThe underneath of cap should be moist with oil but not full of it.\nTher should no milky white frothing."
      },
      {
        "id": "q_4_5",
        "number": "4.5",
        "question": "Open the coolant cap near the front of the car.",
        "expected": "Coolant should come off the on the finger as clear liquid - not oily or dark with skunk. Not chocolate milky\nThe underneath of cap should be wet indicating full coolant."
      },
      {
        "id": "q_4_6",
        "number": "4.6",
        "question": "Check transmission fluid (yellow handle).",
        "expected": "Its level on the stick should not be low.\nIts color on the stuck should be red, not brown. No metallic flakes.\nIt shouldn't smell burnt."
      },
      {
        "id": "q_4_7",
        "number": "4.7",
        "question": "Check brake fluid level.",
        "expected": "It should be full."
      },
      {
        "id": "q_4_8",
        "number": "4.8",
        "question": "Peer into engine and look for any belts you can see with a flashlight",
        "expected": "Belts should not look worn or frayed. They should be tight with a little bit of give and a quarter twist (90 degrees)."
      },
      {
        "id": "q_4_9",
        "number": "4.9",
        "question": "Check coolant container.",
        "expected": "Coolant should look bright green, Blue or yellow -  not muddy or dark which could indicate head gasket leak."
      },
      {
        "id": "q_4_10",
        "number": "4.10",
        "question": "Slam the hood shut.",
        "expected": "It should slam shut flush and sit propelry in its slot and not stick out"
      }
    ]
  },
  {
    "number": "5",
    "title": "Interior with car off",
    "items": [
      {
        "id": "q_5_1",
        "number": "5.1",
        "question": "Inspect seats, smell them.",
        "expected": "No wrinkles, stains,  tears, or rips.\nNo smell."
      },
      {
        "id": "q_5_2",
        "number": "5.2",
        "question": "Inspect carpets, smell them.",
        "expected": "No stains, patches, tears, rips\nNo moldy smell.\nFeel around under the carpet in front passenger footwell. There should be no moisture or dampness"
      },
      {
        "id": "q_5_3",
        "number": "5.3",
        "question": "Check all locks with the key fob and manually including trunk lock.",
        "expected": "All locks should work.\nTrunk should open automatically"
      },
      {
        "id": "q_5_4",
        "number": "5.4",
        "question": "Inspect headliner, back of reer view mirrors, sun shade",
        "expected": "No stains, or smudges or burns\nNo smell."
      },
      {
        "id": "q_5_5",
        "number": "5.5",
        "question": "Inspect dashboard, gear shifter and steering wheel",
        "expected": "Should look clean with no misising buttons or open, exposed areas\nSteering wheel and gear shifter should not look worn\nThe glovebox and console should open and close."
      }
    ]
  },
  {
    "number": "6",
    "title": "Test Idle",
    "items": [
      {
        "id": "q_6_1",
        "number": "6.1",
        "question": "Pop the hood and have someone standing outside when the car is tunred on"
      },
      {
        "id": "q_6_2",
        "number": "6.2",
        "question": "Plug in OBDII scanner."
      },
      {
        "id": "q_6_3",
        "number": "6.3",
        "question": "Turn ignition to ON.",
        "expected": "CEL, Air bag light, Oil light on the dashbaord should appear\nDo VSC, ABS, TRAC, Batt light come on\nOBD will get data. The data should show no Not/ready monitors.\nThe data should show no DTC codes - pending (orange or asterisk) or current confirned DTCs"
      },
      {
        "id": "q_6_4",
        "number": "6.4",
        "question": "Turn ignition to start.",
        "expected": "It should start strong at first turn without hesitation. If it is struggling and coughing to turn on, that is bad.\nThere should be no whining or chirping noise.\nCEL, Air bag light, Oil light on the dashbaord should disappear\nVSC, ABS, TRAC, Batt light should disappear\nThe person standing outside should not have heard any noises either. Engine should give smooth burbling, murmuring noise not like ghata ghata, clacka, clakca water pump type noise and it should not be giving engine growl  going up and down as if it is revving up and down again and again.\nThe person standing outside should not see any shaking in the engine block"
      },
      {
        "id": "q_6_5",
        "number": "6.5",
        "question": "Observe and feel the car idling",
        "expected": "The engine should be smooth. The car should not be shaking\nThe RPMs shodl be steady at 1000 or so\nCheck the temp gauge. The needle should be at the bottom indicating that car was not recently warmed up"
      },
      {
        "id": "q_6_6",
        "number": "6.6",
        "question": "Check all headlights, turn signsls lights and brake lights, interior lights and horn",
        "expected": "They should all work."
      },
      {
        "id": "q_6_7",
        "number": "6.7",
        "question": "Check the radio and bluetooth",
        "expected": "Make siure it receives Am and FM radio stations\nmakre sure bluetooth or CD works"
      },
      {
        "id": "q_6_8",
        "number": "6.8",
        "question": "Turn the A/C on and heater on.",
        "expected": "Check if AC blows cold air.\nCheck if heater blows hot air\nCheck if defroster sends hot air in front window"
      },
      {
        "id": "q_6_9",
        "number": "6.9",
        "question": "Check mirrors can be moved left, right, up and down",
        "expected": "mirrors  should move left, right, up and down"
      },
      {
        "id": "q_6_10",
        "number": "6.10",
        "question": "Check seat adjustment backwards and forwards up and down",
        "expected": "The passenger and driver seat should move and adjust and lock"
      },
      {
        "id": "q_6_11",
        "number": "6.11",
        "question": "Inspect power windows go up and down",
        "expected": "All windows front and rear should go up and down smoothly"
      },
      {
        "id": "q_6_12",
        "number": "6.12",
        "question": "Check all doors can be locked and unlocked from the passenger seat",
        "expected": "All doots should be able to be locked and unlocked"
      },
      {
        "id": "q_6_13",
        "number": "6.13",
        "question": "Check wipers and windshield water.",
        "expected": "Wiper should work.\nwindshield washer should spray."
      },
      {
        "id": "q_6_14",
        "number": "6.14",
        "question": "Turn the steering wheel all the way to the left and eyeball underneath wheel well",
        "expected": "Look at place where axle joins the wheel and look for any cv boots that look torn or broken."
      },
      {
        "id": "q_6_15",
        "number": "6.15",
        "question": "Turn the steering wheel all the way to the right and eyeball underneath wheel well",
        "expected": "Look at place where axle joins the wheel and look for any cv boots that look torn or broken."
      },
      {
        "id": "q_6_16",
        "number": "6.16",
        "question": "After the car is running for sometime, open oil cap.",
        "expected": "There should be mild pulsing or misting not a big one, There should be no frothing or milkiness under the oil cap"
      },
      {
        "id": "q_6_17",
        "number": "6.17",
        "question": "After the car is running for sometime, go and look under the car from the front",
        "expected": "There should be no liquids dripping."
      },
      {
        "id": "q_6_18",
        "number": "6.18",
        "question": "After the car is running for sometime and look and smell the tailpipe.",
        "expected": "No smoke should be coming out and there should be neither a sweet smell of coolant burning or smell of oil burning. On a cold day, you may see some white water vapor smoke that rises, disappears quickly and makes no smell. Oil burning blue smoke is thicker and hangs around. Coolant burning white smoke also hangs around and smell lingers. Gas burning is black smoke. Nothing should be coming out it should of the tail pipe. It should be clear unless it is water vapor on a very cold day."
      }
    ]
  },
  {
    "number": "7",
    "title": "Test Drive",
    "items": [
      {
        "id": "q_7_1",
        "number": "7.1",
        "question": "Press brake and use gear handle to put car in different gears",
        "expected": "The gear should shift smoothly without catching anywhere"
      },
      {
        "id": "q_7_2",
        "number": "7.2",
        "question": "Put car in reverse gear and start to drive backwards. Keep radio off and fan off.",
        "expected": "Listen for any ghata ghata noises, Thuds, chirping, Squeals.or grinding."
      },
      {
        "id": "q_7_3",
        "number": "7.3",
        "question": "Put car in gear and start to drive foward. Keep radio off and fan off.",
        "expected": "Listen for any ghata ghata noises, Thuds, chirping, Squeals.or grinding."
      },
      {
        "id": "q_7_4",
        "number": "7.4",
        "question": "Drive the car slower and then gain speed at a steady pace",
        "expected": "The car should gain speed with smooth transmission shifts - no jerks or kicks. You shouldnt have to coax the gear to shift. It should NOT feel like you are pushing into high rpm but gear is not shifting"
      },
      {
        "id": "q_7_5",
        "number": "7.5",
        "question": "While driving straight, feel any vibrations through the steering wheel",
        "expected": "There should be no vibrations"
      },
      {
        "id": "q_7_6",
        "number": "7.6",
        "question": "Drive zig zag left and right by turning the wheel back and forth",
        "expected": "The wheels should turn responsively. There should be no lag or dead-turning of the steering wheel that doesn’t actiually turn the car wheels."
      },
      {
        "id": "q_7_7",
        "number": "7.7",
        "question": "Push the gas pedal and release it up and down every 3 seconds",
        "expected": "The throttle should be responsive. There should be no hesitation or lag in how the car speeds up when you push dpown and slows down when you release."
      },
      {
        "id": "q_7_8",
        "number": "7.8",
        "question": "While driving slow, do an extreme right turn and drive in a circle.",
        "expected": "Power steeing should turn easily without whine.\nListen for any noise like grinding, clicking or clunking noise coming from wheels."
      },
      {
        "id": "q_7_9",
        "number": "7.9",
        "question": "While driving slow, do an extreme right turn and drive in a circle.",
        "expected": "Power steeing should turn easily without whine.\nListen for any noise like grinding, clicking or clunking noise coming from wheels."
      },
      {
        "id": "q_7_10",
        "number": "7.10",
        "question": "Apply the brakes smoothly.",
        "expected": "It should not feel like the brake pedal sinks all the way down. Should be consistent firm pedal feel\nThe car should come to stop quickly without any jarring, pulsating, juddering under the brake pedal or steering wheel.\nThe car should come to a stop without pulling to one side or the otherand  making you counter that with steering wheel"
      },
      {
        "id": "q_7_11",
        "number": "7.11",
        "question": "Floor the pedal",
        "expected": "There should be no similar issues of  hesitation, jerks or kicks with transmission shifts in hard acceleration"
      },
      {
        "id": "q_7_12",
        "number": "7.12",
        "question": "Apply the brakes hard",
        "expected": "It should not feel like the brake pedal sinks all the way down\nThe car should come to stop quickly without any jarring, pulsating, juddering under the brake pedal or steering wheel.\nThe car should come to a stop without pulling to one side or the other and making you counter that with the steering wheel"
      },
      {
        "id": "q_7_13",
        "number": "7.13",
        "question": "Go over some bumps or over a rough road",
        "expected": "There should not be juddering in steering column. No excessive up and down bounce\nThere should not be any ghata ghata or creaking noises coming from the car\nThe vehicle should not track to the next lane"
      },
      {
        "id": "q_7_14",
        "number": "7.14",
        "question": "Put the steering wheel in normal, cental position and drive sraight fast with no hands on wheel",
        "expected": "You should be abe to drive straight without having to adjust steering wheel off from center to keep the car going straight to ensure car has good alignment.  The car should not have a tendency to go at an angle it should go straight and it should not feel like you have to constanly put hand on steering wherenm to prevent car from pulling to one side or the other. Drive fast in a straight line and break super hard with your hands barely touching the wheel to determine if the car veers under hard breaking"
      },
      {
        "id": "q_7_15",
        "number": "7.15",
        "question": "Observe the tempo gauge",
        "expected": "The needle should be just a bit below midway point and stay there."
      },
      {
        "id": "q_7_16",
        "number": "7.16",
        "question": "Turn on cruise control.",
        "expected": "It should work at maintaining speed with smooth transmission shifts without herky jerky feeling\nIt should accerlate and decclerate if control lever is appropriately pressed. It should disengage with brake"
      }
    ]
  }
] as unknown as Section[];

function classNames(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function download(filename: string, data: string, mime = "text/plain;charset=utf-8") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data], { type: mime }));
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}

function toCSV(rows: string[][]) {
  const esc = (s: string) => {
    const v = s ?? "";
    return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
  };
  return rows.map((r) => r.map(esc).join(",")).join("\n");
}

export default function App() {
  // Steps: 0 Vehicle → 1..N sections → N+1 Summary
  const [step, setStep] = useState(0);
  const [vehicle, setVehicle] = useState<VehicleInfo>({
    make: "", model: "", year: "", vin: "", odometer: "",
    askingPrice: "", sellerName: "", phone: "", cityState: "", listingUrl: ""
  });

  // Answers
  const [firstCall, setFirstCall] = useState<Record<string, FirstCallAnswer>>({});
  const [scored, setScored] = useState<Record<string, ScoredAnswer>>({});

  const sections: Section[] = WIZARD_SECTIONS;
  const totalSteps = sections.length + 2; // vehicle + sections + summary
  const currentSectionIndex = step - 1; // 0.. sections.length-1

  const onVehicle = (k: keyof VehicleInfo, v: string) => setVehicle((p) => ({ ...p, [k]: v }));
  const goto = (delta: number) => setStep((s) => Math.min(Math.max(s + delta, 0), totalSteps - 1));

  // Derived arrays for rendering / summary
  const firstCallItems = useMemo(() => {
    const s1 = sections.find((s) => s.number === "1");
    return (s1?.items ?? []).map((q) => ({
      id: q.id,
      question: q.question,
      expected: (q as any).expected,
      answer: firstCall[q.id]?.answer ?? ""
    }));
  }, [sections, firstCall]);

  const scoredBySection = useMemo(() => {
    return sections
      .filter((s) => s.number !== "1")
      .map((s) => ({
        section: s,
        items: s.items.map((q) => ({
          id: q.id, number: q.number, question: q.question, expected: (q as any).expected,
          score: scored[q.id]?.score,
          notes: scored[q.id]?.notes ?? ""
        }))
      }));
  }, [sections, scored]);

  const renderFirstCall = () => (
    <section className="bg-white rounded-2xl border p-5 space-y-5">
      <h2 className="text-base font-semibold">{sections.find((s)=>s.number==='1')?.title ?? 'First Call to Seller'}</h2>
      {firstCallItems.map((q) => (
        <div key={q.id} className="rounded-xl border p-4">
          <div className="font-medium">{q.question}</div>
          {q.expected && <div className="text-xs text-gray-500 mt-1 whitespace-pre-line">{q.expected}</div>}
          <textarea
            className="mt-3 w-full min-h-[90px] rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type the seller's answer here…"
            value={q.answer}
            onChange={(e) =>
              setFirstCall((prev) => ({
                ...prev,
                [q.id]: { id: q.id, question: q.question, expected: q.expected, answer: e.target.value }
              }))
            }
          />
        </div>
      ))}
    </section>
  );

  const renderScoredSection = (sec: Section) => (
    <section className="bg-white rounded-2xl border p-5 space-y-5">
      <h2 className="text-base font-semibold">{sec.title}</h2>
      {sec.items.map((q) => {
        const curr = scored[q.id] ?? { id: q.id, number: q.number, question: q.question, expected: (q as any).expected };
        return (
          <div key={q.id} className="rounded-xl border p-4">
            <div className="font-medium">{q.number} — {q.question}</div>
            {(q as any).expected && <div className="text-xs text-gray-500 mt-1 whitespace-pre-line">{(q as any).expected}</div>}
            <div className="mt-3 flex flex-wrap gap-3 items-center">
              <span className="text-sm text-gray-600">Score:</span>
              {[1,2,3,4].map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={q.id}
                    checked={curr.score === v}
                    onChange={() =>
                      setScored((prev) => ({ ...prev, [q.id]: { ...curr, score: v } }))
                    }
                  />
                  {v}
                </label>
              ))}
            </div>
            <textarea
              className="mt-3 w-full min-h-[70px] rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Notes…"
              value={curr.notes ?? ""}
              onChange={(e) => setScored((prev) => ({ ...prev, [q.id]: { ...curr, notes: e.target.value } }))}
            />
          </div>
        );
      })}
    </section>
  );

  const nav = (
    <div className="flex items-center gap-2">
      <button
        className={classNames("rounded-lg px-4 py-2 border", step === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50")}
        disabled={step === 0}
        onClick={() => goto(-1)}
      >
        Back
      </button>
      <button
        className={classNames("rounded-lg px-4 py-2 text-white", step < totalSteps-1 ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700")}
        onClick={() => goto(1)}
      >
        {step < totalSteps-1 ? "Next" : "Finish"}
      </button>
    </div>
  );

  // Downloads on Summary
  const handleDownloadJSON = () => {
    const payload = {
      vehicle,
      firstCall: firstCallItems,
      sections: scoredBySection
    };
    download(
      `used-car-checklist-${new Date().toISOString().slice(0, 19)}.json`,
      JSON.stringify(payload, null, 2),
      "application/json;charset=utf-8"
    );
  };

  const handleDownloadCSV = () => {
    const rows: string[][] = [];
    rows.push(["Section","Number","Field / Question","Expected / Reference","Score","Answer / Notes"]);

    // Vehicle
    Object.entries(vehicle).forEach(([k,v]) => rows.push(["Vehicle","",labelize(k),"","",v as string]));

    // First Call
    firstCallItems.forEach((q, i) =>
      rows.push(["First Call to Seller", `${i+1}`, q.question, q.expected ?? "", "", q.answer ?? ""])
    );

    // Scored sections
    scoredBySection.forEach(({section, items}) => {
      items.forEach((it) => {
        rows.push([section.title, it.number, it.question, it.expected ?? "", (it.score ?? "").toString(), it.notes ?? ""]);
      });
    });

    download(
      `used-car-checklist-${new Date().toISOString().slice(0, 19)}.csv`,
      toCSV(rows),
      "text/csv;charset=utf-8"
    );
  };

  // ---- RENDER ----
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Used Car Checklist Wizard</h1>
          <div className="flex flex-wrap gap-2 text-xs">
            <StepBadge label="Vehicle" active={step===0} done={step>0}/>
            {sections.map((s, idx) => (
              <StepBadge key={s.number} label={s.title} active={step===idx+1} done={step>idx+1}/>
            ))}
            <StepBadge label="Summary" active={step===totalSteps-1} />
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border px-3 py-2 hover:bg-gray-50" onClick={handleDownloadJSON}>Download JSON</button>
            <button className="rounded-lg border px-3 py-2 hover:bg-gray-50" onClick={handleDownloadCSV}>Download CSV</button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <div className="flex items-center gap-2">
              <button
                className={classNames("rounded-lg px-4 py-2 border", step === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50")}
                disabled={step === 0}
                onClick={() => goto(-1)}
              >
                Back
              </button>
              <button
                className={classNames("rounded-lg px-4 py-2 text-white", step < totalSteps-1 ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700")}
                onClick={() => goto(1)}
              >
                {step < totalSteps-1 ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {step === 0 && (
          <section className="bg-white rounded-2xl border p-5 space-y-4">
            <h2 className="text-base font-semibold mb-1">Vehicle Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput label="Make" value={vehicle.make} onChange={(v) => onVehicle("make", v)} />
              <TextInput label="Model" value={vehicle.model} onChange={(v) => onVehicle("model", v)} />
              <TextInput label="Year" value={vehicle.year} onChange={(v) => onVehicle("year", v)} />
              <TextInput label="VIN" value={vehicle.vin} onChange={(v) => onVehicle("vin", v)} />
              <TextInput label="Odometer" value={vehicle.odometer} onChange={(v) => onVehicle("odometer", v)} />
              <TextInput label="Asking Price" value={vehicle.askingPrice} onChange={(v) => onVehicle("askingPrice", v)} />
              <TextInput label="Seller Name" value={vehicle.sellerName} onChange={(v) => onVehicle("sellerName", v)} />
              <TextInput label="Phone" value={vehicle.phone} onChange={(v) => onVehicle("phone", v)} />
              <TextInput label="City / State" value={vehicle.cityState} onChange={(v) => onVehicle("cityState", v)} />
              <TextInput label="Listing URL" value={vehicle.listingUrl} onChange={(v) => onVehicle("listingUrl", v)} />
            </div>
          </section>
        )}

        {step > 0 && step < totalSteps-1 && (
          <>
            {sections[currentSectionIndex].number === "1"
              ? renderFirstCall()
              : renderScoredSection(sections[currentSectionIndex])}
          </>
        )}

        {step === totalSteps-1 && (
          <section className="bg-white rounded-2xl border p-5 space-y-5">
            <h2 className="text-base font-semibold">Summary</h2>

            <div className="rounded-xl border bg-gray-50 p-4">
              <h3 className="font-medium mb-2">Vehicle</h3>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                {Object.entries(vehicle).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <span className="text-gray-600">{labelize(k)}:</span>
                    <span className="font-medium break-all">{v || "—"}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-gray-50 p-4">
              <h3 className="font-medium mb-2">First Call to Seller</h3>
              <ol className="space-y-3 list-decimal pl-5">
                {firstCallItems.map((a, i) => (
                  <li key={a.id} className="text-sm">
                    <div className="font-medium">{a.question}</div>
                    {a.expected && <div className="text-gray-600 whitespace-pre-line">Expected: {a.expected}</div>}
                    <div className="mt-1">
                      <span className="text-gray-600">Answer: </span>
                      <span className="font-medium break-words whitespace-pre-wrap">{a.answer || "—"}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {scoredBySection.map(({section, items}) => (
              <div key={section.number} className="rounded-xl border bg-gray-50 p-4">
                <h3 className="font-medium mb-2">{section.title}</h3>
                <div className="space-y-2">
                  {items.map((it) => (
                    <div key={it.id} className="text-sm">
                      <div className="font-medium">{it.number} — {it.question}</div>
                      {it.expected && <div className="text-gray-600 whitespace-pre-line">Expected: {it.expected}</div>}
                      <div className="mt-1 flex gap-4">
                        <div><span className="text-gray-600">Score:</span> <span className="font-medium">{it.score ?? "—"}</span></div>
                        <div><span className="text-gray-600">Notes:</span> <span className="font-medium whitespace-pre-wrap break-words">{it.notes || "—"}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function StepBadge({ label, active, done }: { label: string; active?: boolean; done?: boolean }) {
  return (
    <div
      className={classNames(
        "px-2 py-1 rounded-full border",
        "text-[11px]",
        active && "bg-blue-600 text-white border-blue-600",
        !active && done && "bg-green-50 text-green-800 border-green-200",
        !active && !done && "bg-gray-50 text-gray-700 border-gray-200"
      )}
    >
      {label}
    </div>
  );
}

function TextInput({
  label, value, onChange, placeholder
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; }) {
  return (
    <label className="block">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <input
        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function labelize(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
