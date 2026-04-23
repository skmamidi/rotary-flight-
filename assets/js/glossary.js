// Rotary Flight App - glossary.js
// Glossary popup, chips, flashcards

const Glossary = {
  terms: {},

  // Map glossary terms to their most relevant topic/practice page
  // Paths are relative from topics/glossary/ pages
  termLinks: {
    // Introduction
    'rotary flight': '../introduction/what-is-rotary-flight.html',
    'fixed-wing': '../introduction/rotary-vs-fixed-wing.html',
    'rotor': '../introduction/rotor-basics.html',
    'rotor blade': '../introduction/rotor-basics.html',
    'lift': '../introduction/lift-in-rotary-flight.html',
    'drag': '../flight-science/forces-of-flight.html',
    'thrust': '../flight-science/forces-of-flight.html',
    'weight': '../flight-science/forces-of-flight.html',
    'vtol': '../introduction/vtol.html',
    'hover': '../introduction/hovering.html',
    'hovering': '../introduction/hovering.html',
    'airfoil': '../introduction/lift-in-rotary-flight.html',
    'airflow': '../introduction/lift-in-rotary-flight.html',
    // Early Concepts
    'aerial screw': '../early-concepts/da-vinci-aerial-screw.html',
    'autogyro': '../aircraft-types/autogyros.html',
    // Pioneers
    'single rotor': '../aircraft-types/single-rotor.html',
    // Aircraft Types
    'tiltrotor': '../aircraft-types/tiltrotors.html',
    'coaxial rotor': '../aircraft-types/coaxial-rotor.html',
    'tandem rotor': '../aircraft-types/tandem-rotor.html',
    'counter-rotating': '../aircraft-types/coaxial-rotor.html',
    'unpowered rotor': '../aircraft-types/autogyros.html',
    'forward flight': '../flight-science/forces-of-flight.html',
    // Flight Science
    'torque': '../flight-science/torque.html',
    'anti-torque': '../flight-science/anti-torque-systems.html',
    'tail rotor': '../flight-science/anti-torque-systems.html',
    'collective': '../flight-science/collective-control.html',
    'cyclic': '../flight-science/cyclic-control.html',
    'yaw': '../flight-science/yaw-pitch-roll.html',
    'pitch': '../flight-science/yaw-pitch-roll.html',
    'roll': '../flight-science/yaw-pitch-roll.html',
    'autorotation': '../flight-science/autorotation.html',
    'angle of attack': '../flight-science/angle-of-attack.html',
    'blade pitch': '../flight-science/collective-control.html',
    'swashplate': '../flight-science/cyclic-control.html',
    'main rotor': '../introduction/rotor-basics.html',
    'rotor disk': '../flight-science/cyclic-control.html',
    'downwash': '../introduction/lift-in-rotary-flight.html',
    'center of gravity': '../flight-science/stability-and-control.html',
    'gyroscopic precession': '../flight-science/cyclic-control.html',
    'translating tendency': '../flight-science/torque.html',
    'dissymmetry of lift': '../flight-science/rotor-blade-lift.html',
    'advancing blade': '../flight-science/rotor-blade-lift.html',
    'retreating blade': '../flight-science/rotor-blade-lift.html',
    'blade flapping': '../flight-science/rotor-blade-lift.html',
    'blade coning': '../flight-science/rotor-blade-lift.html',
    'stall': '../flight-science/angle-of-attack.html',
    'induced drag': '../flight-science/forces-of-flight.html',
    'parasitic drag': '../flight-science/forces-of-flight.html',
    'relative wind': '../flight-science/angle-of-attack.html',
    'tailwind': '../flight-science/forces-of-flight.html',
    'headwind': '../flight-science/forces-of-flight.html',
    'freewheeling unit': '../flight-science/autorotation.html',
    'driven region': '../flight-science/autorotation.html',
    'driving region': '../flight-science/autorotation.html',
    'stalled region': '../flight-science/autorotation.html',
    'lead-lag': '../flight-science/rotor-blade-lift.html',
    'phase lag': '../flight-science/cyclic-control.html',
    'thrust vector': '../flight-science/cyclic-control.html',
    'longitudinal axis': '../flight-science/yaw-pitch-roll.html',
    'lateral axis': '../flight-science/yaw-pitch-roll.html',
    'vertical axis': '../flight-science/yaw-pitch-roll.html',
    'maneuverability': '../flight-science/stability-and-control.html',
    'stability': '../flight-science/stability-and-control.html',
    'inherent instability': '../flight-science/stability-and-control.html',
    'pendulum effect': '../flight-science/stability-and-control.html',
    'nose heavy': '../flight-science/stability-and-control.html',
    'turbulent flow': '../flight-science/angle-of-attack.html',
    'attached flow': '../flight-science/angle-of-attack.html',
    'flow separation': '../flight-science/angle-of-attack.html',
    'Bernoulli\'s principle': '../introduction/lift-in-rotary-flight.html',
    'pressure difference': '../introduction/lift-in-rotary-flight.html',
    'kinetic energy': '../flight-science/autorotation.html',
    // Parts
    'mast': '../introduction/rotor-basics.html',
    'hub': '../introduction/rotor-basics.html',
    'nacelle': '../aircraft-types/tiltrotors.html',
    'engine': '../introduction/rotor-basics.html',
    'transmission': '../introduction/rotor-basics.html',
    'fuselage': '../introduction/rotor-basics.html',
    'cockpit': '../introduction/rotor-basics.html',
    'pitch link': '../aircraft-types/helicopters-overview.html',
    'tail boom': '../introduction/rotor-basics.html',
    'landing skids': '../aircraft-types/helicopters-overview.html',
    'horizontal stabilizer': '../flight-science/stability-and-control.html',
    'vertical fin': '../flight-science/stability-and-control.html',
    'air intake': '../introduction/rotor-basics.html',
    'exhaust': '../introduction/rotor-basics.html',
    'turboshaft engine': '../introduction/rotor-basics.html',
    'stabilizer bar': '../flight-science/stability-and-control.html',
    'NOTAR': '../flight-science/anti-torque-systems.html',
    // Applications
    'heavy-lift': '../aircraft-types/tandem-rotor.html',
    'offshore oil rigs': '../applications/transportation.html',
    'surveillance': '../applications/law-enforcement.html',
    'winches': '../applications/search-and-rescue.html',
    'thermal cameras': '../applications/law-enforcement.html',
    // Practice fallbacks for terms without dedicated pages
    'rotor rpm': '../olympiad/vocabulary-drill.html',
  },

  async load() {
    try {
      const response = await fetch('../../assets/data/glossary.json');
      const data = await response.json();
      this.terms = data;
    } catch (e) {
      // Fallback inline glossary for local file usage
      this.terms = {
        'rotary flight': { def: 'Flight using rotating blades or wings to create lift.', comp: 'A type of heavier-than-air flight where lift is generated by rotating airfoils rather than fixed wings.', example: 'A helicopter achieves rotary flight with its spinning main rotor.', icon: '🚁' },
        'fixed-wing': { def: 'Aircraft that use rigid wings and forward motion to create lift.', comp: 'Airplanes are fixed-wing aircraft; they cannot hover without special thrust systems.', example: 'An airliner is a fixed-wing aircraft.', icon: '✈️' },
        'rotor': { def: 'A set of rotating blades that generates lift on a rotary-wing aircraft.', comp: 'The complete assembly of blades, hub, and mast that produces lift.', example: 'The main rotor sits on top of the helicopter.', icon: '⚙️' },
        'rotor blade': { def: 'A long, shaped wing that spins to create lift.', comp: 'Each individual airfoil attached to the rotor hub.', example: 'Helicopters usually have two to eight rotor blades.', icon: '🪶' },
        'lift': { def: 'The upward force created by air moving over a wing or rotor blade.', comp: 'One of the four forces of flight; opposes weight.', example: 'Faster spinning creates more lift.', icon: '⬆️' },
        'drag': { def: 'Air resistance that opposes motion through the air.', comp: 'One of the four forces of flight; opposes thrust.', example: 'Streamlined shapes reduce drag.', icon: '🌬️' },
        'thrust': { def: 'The force that moves an aircraft forward or upward.', comp: 'One of the four forces of flight; opposes drag.', example: 'A helicopter rotor provides both lift and thrust.', icon: '🚀' },
        'weight': { def: 'The downward pull of gravity on an aircraft.', comp: 'One of the four forces of flight; opposes lift.', example: 'To climb, lift must exceed weight.', icon: '⚖️' },
        'torque': { def: 'A twisting force. In helicopters, spinning the rotor one way tends to spin the body the other way.', comp: 'Newton\'s third law reaction force requiring anti-torque systems.', example: 'The tail rotor counters main rotor torque.', icon: '🔄' },
        'anti-torque': { def: 'A system that prevents the helicopter body from spinning opposite to the rotor.', comp: 'Includes tail rotors, NOTAR, or coaxial counter-rotating rotors.', example: 'The tail rotor provides anti-torque force.', icon: '🛡️' },
        'tail rotor': { def: 'A small rotor on the tail that pushes against torque.', comp: 'Produces sideways thrust to counter main rotor torque and controls yaw.', example: 'Increasing tail rotor thrust yaws the nose.', icon: '🌀' },
        'collective': { def: 'The control that changes all rotor blade angles together.', comp: 'Increases or decreases total lift equally on all blades.', example: 'Pulling up the collective makes the helicopter climb.', icon: '🎚️' },
        'cyclic': { def: 'The control that tilts the rotor disk to move in a direction.', comp: 'Changes blade pitch selectively during rotation to tilt the rotor.', example: 'Pushing the cyclic forward tilts the rotor and moves the helicopter forward.', icon: '🕹️' },
        'yaw': { def: 'Rotation around the vertical axis (nose left or right).', comp: 'Controlled by the tail rotor or anti-torque system.', example: 'Pressing the foot pedals changes yaw.', icon: '↔️' },
        'pitch': { def: 'Rotation around the side-to-side axis (nose up or down).', comp: 'In helicopters, controlled by the cyclic stick.', example: 'Pulling back on the cyclic pitches the nose up.', icon: '↕️' },
        'roll': { def: 'Rotation around the front-to-back axis (tilting side to side).', comp: 'In helicopters, controlled by the cyclic stick sideways.', example: 'Moving the cyclic left rolls the helicopter left.', icon: '↩️' },
        'vtol': { def: 'Vertical Takeoff and Landing; ability to lift off without a runway.', comp: 'Key capability of helicopters and some tiltrotors.', example: 'A helicopter uses VTOL to take off from a rooftop.', icon: '🛫' },
        'hover': { def: 'Remaining in one place in the air.', comp: 'Requires lift to equal weight and control inputs to maintain position.', example: 'Rescue helicopters hover over accident scenes.', icon: '🎯' },
        'autorotation': { def: 'A safety descent where the rotor spins from upward airflow after engine failure.', comp: 'Unpowered rotor rotation used for emergency landing.', example: 'Pilots practice autorotation for engine-out emergencies.', icon: '🪂' },
        'autogyro': { def: 'An aircraft with an unpowered rotor that spins from airflow, plus a propeller for thrust.', comp: 'Not a helicopter; rotor is not powered for lift.', example: 'Juan de la Cierva invented the autogyro in the 1920s.', icon: '🔄' },
        'tiltrotor': { def: 'An aircraft with rotors that can tilt between vertical and horizontal positions.', comp: 'Combines VTOL capability with airplane-like forward speed.', example: 'The V-22 Osprey is a tiltrotor aircraft.', icon: '🔃' },
        'coaxial rotor': { def: 'Two rotors mounted one above the other, spinning in opposite directions.', comp: 'Cancels torque without a tail rotor.', example: 'The Kamov Ka-50 uses coaxial rotors.', icon: '⏫' },
        'tandem rotor': { def: 'Two large rotors, one at the front and one at the rear.', comp: 'Cancels torque and provides heavy lift capability.', example: 'The CH-47 Chinook has tandem rotors.', icon: '⏫⏫' },
        'airfoil': { def: 'A shaped surface designed to create lift from airflow.', comp: 'Includes wings and rotor blades with curved upper surfaces.', example: 'A rotor blade is a type of airfoil.', icon: '📐' },
        'angle of attack': { def: 'The angle between the blade and the oncoming air.', comp: 'Affects lift and drag; too high causes stall.', example: 'Increasing angle of attack increases lift until stall.', icon: '📏' },
        'mast': { def: 'The vertical shaft that supports the main rotor.', comp: 'Connects the rotor hub to the transmission and airframe.', example: 'The mast passes through the center of the rotor hub.', icon: '📍' },
        'hub': { def: 'The central part of the rotor that attaches the blades to the mast.', comp: 'Holds blades and allows pitch changes.', example: 'The hub connects all rotor blades to the mast.', icon: '🔩' },
        'nacelle': { def: 'A housing on a tiltrotor that holds the engine and rotor.', comp: 'Tilts to switch between vertical lift and forward thrust.', example: 'The V-22 Osprey tilts its nacelles 90 degrees.', icon: '📦' },
        'airflow': { def: 'The movement of air over and around an aircraft.', comp: 'Essential for generating lift on any wing or rotor.', example: 'Rotor blades need airflow to create lift.', icon: '💨' },
        'engine': { def: 'A machine that converts fuel into mechanical power to spin the rotor.', comp: 'Helicopter engines drive the transmission, which turns the rotor.', example: 'A turboshaft engine is common in helicopters.', icon: '⚙️' },
        'transmission': { def: 'The gearbox that transfers power from the engine to the rotor.', comp: 'Changes engine speed to optimal rotor speed.', example: 'The transmission sits between the engine and the mast.', icon: '⚙️' },
        'fuselage': { def: 'The main body of the aircraft that holds crew, cargo, and systems.', comp: 'The central structure to which all other parts attach.', example: 'The fuselage houses the cockpit and passengers.', icon: '🏗️' },
        'cockpit': { def: 'The area where the pilot sits and controls the aircraft.', comp: 'Contains flight controls, instruments, and displays.', example: 'The cyclic and collective are in the cockpit.', icon: '🎮' },
        'blade pitch': { def: 'The angle of a rotor blade relative to the oncoming air.', comp: 'Higher pitch increases lift and drag; lower pitch decreases them.', example: 'The collective changes blade pitch on all blades equally.', icon: '📐' },
        'swashplate': { def: 'A rotating mechanical device that transfers pilot control inputs to the spinning rotor blades.', comp: 'Tilts and moves up/down to change blade pitch cyclically and collectively.', example: 'The swashplate tilts when the pilot pushes the cyclic stick.', icon: '🔘' },
        'main rotor': { def: 'The primary large rotor on top of a helicopter that generates lift.', comp: 'Consists of blades, hub, and mast; provides lift and thrust.', example: 'The main rotor spins at hundreds of RPM to keep the helicopter airborne.', icon: '🌀' },
        'rotor disk': { def: 'The circular area swept by the spinning rotor blades.', comp: 'The disk tilts when cyclic input is applied, directing thrust.', example: 'Downwash flows through the rotor disk during hover.', icon: '⭕' },
        'downwash': { def: 'The downward flow of air pushed by the rotor blades.', comp: 'Creates a column of accelerated air beneath the rotor disk.', example: 'Downwash can kick up dust and debris during a landing.', icon: '⬇️' },
        'center of gravity': { def: 'The point where an aircraft\'s weight is evenly balanced in all directions.', comp: 'Must stay within limits for stable flight; shifted by fuel and cargo.', example: 'A forward center of gravity makes the nose pitch down.', icon: '⚖️' },
        'gyroscopic precession': { def: 'A force applied to a spinning rotor takes effect 90 degrees later in the direction of rotation.', comp: 'Explains why cyclic input affects the rotor disk opposite to where force is applied.', example: 'Pushing the cyclic forward actually increases lift on the left side first.', icon: '🔄' },
        'translating tendency': { def: 'The sideways drift caused by tail rotor thrust during hover.', comp: 'Also called hover drift; pilots correct it with cyclic input.', example: 'A helicopter hovers with a slight nose-left tilt to counter translating tendency.', icon: '➡️' },
        'dissymmetry of lift': { def: 'The difference in lift between the advancing and retreating blades in forward flight.', comp: 'Advancing blade has higher airspeed and more lift; retreating blade has less.', example: 'Blade flapping compensates for dissymmetry of lift.', icon: '⚖️' },
        'advancing blade': { def: 'The rotor blade moving in the same direction as the aircraft\'s forward motion.', comp: 'Has higher relative airspeed and produces more lift than the retreating blade.', example: 'In forward flight, the advancing blade is on the right side of the rotor disk.', icon: '➡️' },
        'retreating blade': { def: 'The rotor blade moving opposite to the aircraft\'s forward motion.', comp: 'Has lower relative airspeed and produces less lift; can stall at high speeds.', example: 'The retreating blade is on the left side during forward flight.', icon: '⬅️' },
        'blade flapping': { def: 'The upward and downward movement of rotor blades as they spin.', comp: 'Balances lift between advancing and retreating blades automatically.', example: 'The advancing blade flaps up, reducing its angle of attack and lift.', icon: '↕️' },
        'blade coning': { def: 'The upward bending of rotor blades under lift load, forming a cone shape.', comp: 'Caused by centrifugal force balancing lift; more lift means more coning.', example: 'Heavy loads increase blade coning during takeoff.', icon: '🔺' },
        'stall': { def: 'A sudden loss of lift when the angle of attack becomes too high.', comp: 'Airflow separates from the blade surface, causing a drop in lift and increase in drag.', example: 'A retreating blade can stall at high forward speeds.', icon: '⚠️' },
        'induced drag': { def: 'Drag created as a byproduct of generating lift.', comp: 'Higher lift means higher induced drag; decreases with speed.', example: 'Hovering produces more induced drag than forward flight.', icon: '🌪️' },
        'parasitic drag': { def: 'Drag caused by the aircraft\'s shape and external parts moving through air.', comp: 'Includes form drag and skin friction; increases with the square of speed.', example: 'Landing gear and antennas add parasitic drag.', icon: '🪂' },
        'relative wind': { def: 'The airflow experienced by an airfoil as the aircraft moves.', comp: 'Determines lift and drag; changes with aircraft speed and direction.', example: 'The relative wind over the rotor blade affects lift.', icon: '💨' },
        'tailwind': { def: 'Wind blowing in the same direction as the aircraft is moving.', comp: 'Increases ground speed but reduces relative wind over the airfoil.', example: 'A tailwind reduces lift during takeoff.', icon: '🌬️' },
        'headwind': { def: 'Wind blowing opposite to the direction the aircraft is moving.', comp: 'Increases relative wind and lift; decreases ground speed.', example: 'Pilots prefer taking off into a headwind.', icon: '🌬️' },
        'freewheeling unit': { def: 'A clutch that lets the rotor spin freely if the engine fails.', comp: 'Allows the rotor to continue turning during autorotation.', example: 'The freewheeling unit disengages automatically during engine failure.', icon: '🔓' },
        'driven region': { def: 'The part of the rotor disk where airflow drives the blade rotation.', comp: 'Located near the blade tips; produces drag that spins the rotor.', example: 'During autorotation, the driven region keeps the rotor spinning.', icon: '🔄' },
        'driving region': { def: 'The part of the rotor disk that creates the most lift during autorotation.', comp: 'Located inboard on the blade; has a positive angle of attack.', example: 'The driving region sustains rotor RPM during a glide.', icon: '⬆️' },
        'stalled region': { def: 'The inner part of the rotor disk where the blade angle is too high and lift is lost.', comp: 'During autorotation, this region creates drag but little lift.', example: 'The stalled region is near the root of each blade in autorotation.', icon: '🛑' },
        'lead-lag': { def: 'The forward and backward movement of a rotor blade in the plane of rotation.', comp: 'Also called hunting; compensates for changes in blade velocity.', example: 'Lead-lag hinges allow blades to move independently.', icon: '↔️' },
        'pitch link': { def: 'A rod that connects the swashplate to the rotor blade, changing blade angle.', comp: 'Pushes or pulls to increase or decrease blade pitch.', example: 'When the swashplate tilts, pitch links twist the blades.', icon: '🔗' },
        'tail boom': { def: 'The long rear structure connecting the main fuselage to the tail rotor.', comp: 'Keeps the tail rotor far enough from the main rotor to be effective.', example: 'The tail boom must be strong to handle tail rotor forces.', icon: '📏' },
        'landing skids': { def: 'Simple tubular frames that support the helicopter on the ground.', comp: 'Lightweight and strong; absorb landing impact energy.', example: 'Many training helicopters use landing skids instead of wheels.', icon: '🛷' },
        'horizontal stabilizer': { def: 'Small wing-like surfaces on the tail that help keep the helicopter level.', comp: 'Provides pitch stability during fast forward flight.', example: 'The horizontal stabilizer counters nose-up tendencies at speed.', icon: '✈️' },
        'vertical fin': { def: 'A fixed vertical surface on the tail that improves directional stability.', comp: 'Acts like a weather vane; helps keep the nose pointing forward.', example: 'The vertical fin adds stability during forward flight.', icon: '📐' },
        'air intake': { def: 'The opening that draws air into the engine for combustion.', comp: 'Must be kept clear of debris for proper engine performance.', example: 'Turbine engines need massive amounts of air through the intake.', icon: '🌬️' },
        'exhaust': { def: 'The system that expels hot gases from the engine.', comp: 'Directs combustion gases safely away from the aircraft.', example: 'Engine exhaust is extremely hot and must be vented upward.', icon: '💨' },
        'turboshaft engine': { def: 'A gas turbine engine optimized to produce shaft power rather than thrust.', comp: 'Common in helicopters; drives the transmission to spin the rotor.', example: 'Most modern helicopters use turboshaft engines.', icon: '🔥' },
        'stabilizer bar': { def: 'A weighted bar mounted on the rotor hub that dampens blade movements.', comp: 'Acts as a mechanical gyroscope to improve hover stability.', example: 'The Bell 47 famously uses a stabilizer bar above the rotor.', icon: '⚖️' },
        'NOTAR': { def: 'NO TAil Rotor; a system that uses jet thrust instead of a tail rotor for anti-torque.', comp: 'Blows air through a slot in the tail boom for quieter, safer operation.', example: 'MD Helicopters uses NOTAR on some of their aircraft.', icon: '🚫' },
        'aerial screw': { def: 'Leonardo da Vinci\'s 15th-century design for a vertical-lift machine.', comp: 'A helical airfoil meant to compress air and lift a platform.', example: 'Da Vinci\'s aerial screw was never built but inspired future designs.', icon: '📜' },
        'single rotor': { def: 'A helicopter configuration with one main rotor and a tail rotor.', comp: 'The most common layout; requires anti-torque compensation.', example: 'The Sikorsky R-4 was the first mass-produced single-rotor helicopter.', icon: '🚁' },
        'counter-rotating': { def: 'Rotors that spin in opposite directions to cancel torque.', comp: 'Used in coaxial and tandem rotor designs.', example: 'Counter-rotating rotors eliminate the need for a tail rotor.', icon: '🔄' },
        'hovering': { def: 'Maintaining a fixed position in the air with no forward movement.', comp: 'Requires continuous control adjustments to stay in place.', example: 'Helicopters hover to rescue people from rooftops.', icon: '🎯' },
        'forward flight': { def: 'Movement of a helicopter in a horizontal direction.', comp: 'Changes aerodynamics significantly compared to hover; introduces dissymmetry of lift.', example: 'During forward flight, the advancing blade generates more lift.', icon: '➡️' },
        'unpowered rotor': { def: 'A rotor that spins without engine power, driven by airflow.', comp: 'Used in autogyros and during helicopter autorotation.', example: 'An autogyro\'s unpowered rotor spins from forward motion.', icon: '🍃' },
        'rotor rpm': { def: 'The rotational speed of the rotor measured in revolutions per minute.', comp: 'Critical for maintaining lift; monitored constantly by the pilot.', example: 'Low rotor RPM means less lift and possible settling.', icon: '📊' },
        'turbulent flow': { def: 'Chaotic, irregular airflow that reduces lift and increases drag.', comp: 'Opposite of smooth laminar flow; occurs at high angles of attack.', example: 'Stall causes turbulent flow over the blade.', icon: '🌊' },
        'attached flow': { def: 'Smooth airflow that stays in contact with the airfoil surface.', comp: 'Produces maximum lift and minimum drag.', example: 'At low angles of attack, airflow remains attached to the blade.', icon: '💨' },
        'flow separation': { def: 'When airflow detaches from the airfoil surface, causing a stall.', comp: 'Occurs when angle of attack exceeds the critical angle.', example: 'Flow separation on the retreating blade can cause a stall.', icon: '💥' },
        'Bernoulli\'s principle': { def: 'The principle that faster-moving air has lower pressure.', comp: 'Explains how curved airfoils create lift: faster flow on top means lower pressure.', example: 'Bernoulli\'s principle helps explain rotor blade lift generation.', icon: '📉' },
        'pressure difference': { def: 'The difference in air pressure between the top and bottom of an airfoil.', comp: 'Creates the net upward force we call lift.', example: 'A rotor blade has lower pressure on top and higher pressure below.', icon: '📊' },
        'kinetic energy': { def: 'Energy possessed by a moving object.', comp: 'In autorotation, the spinning rotor stores kinetic energy for landing.', example: 'The pilot uses stored kinetic energy in the rotor to cushion landing.', icon: '⚡' },
        'phase lag': { def: 'The 90-degree delay between cyclic input and rotor response due to gyroscopic precession.', comp: 'Means maximum blade deflection occurs 90 degrees after maximum pitch change.', example: 'Because of phase lag, cyclic inputs must be applied ahead of the desired direction.', icon: '⏱️' },
        'thrust vector': { def: 'The direction in which thrust is applied.', comp: 'In helicopters, tilting the rotor disk changes the thrust vector for directional flight.', example: 'Pushing the cyclic forward tilts the thrust vector forward.', icon: '➡️' },
        'longitudinal axis': { def: 'An imaginary line running from the nose to the tail of the aircraft.', comp: 'Roll occurs around this axis.', example: 'The longitudinal axis runs through the center of the fuselage.', icon: '📏' },
        'lateral axis': { def: 'An imaginary line running from wingtip to wingtip through the aircraft.', comp: 'Pitch occurs around this axis.', example: 'The lateral axis passes through the center of gravity.', icon: '📏' },
        'vertical axis': { def: 'An imaginary line running vertically through the center of the aircraft.', comp: 'Yaw occurs around this axis.', example: 'The vertical axis passes through the main rotor mast.', icon: '📏' },
        'maneuverability': { def: 'The ability of an aircraft to change its direction and attitude quickly.', comp: 'Helicopters trade stability for high maneuverability.', example: 'Helicopters can hover, fly sideways, and turn in place.', icon: '🔄' },
        'stability': { def: 'The tendency of an aircraft to return to steady flight after a disturbance.', comp: 'Helicopters are inherently unstable and require constant pilot input.', example: 'Horizontal stabilizers improve forward-flight stability.', icon: '⚖️' },
        'inherent instability': { def: 'The natural tendency of a helicopter to drift or oscillate without control input.', comp: 'Requires active pilot control or autopilot to maintain attitude.', example: 'Without a stabilizer bar, early helicopters were very unstable.', icon: '⚠️' },
        'pendulum effect': { def: 'The swinging motion of the fuselage hanging beneath the rotor hub.', comp: 'The center of gravity is below the rotor, creating a pendulum-like swing.', example: 'The pendulum effect can cause oscillations during hover.', icon: '🕰️' },
        'nose heavy': { def: 'A condition where the center of gravity is forward of the ideal position.', comp: 'Causes the nose to pitch down; requires more aft cyclic to correct.', example: 'A full fuel tank in the nose can make the helicopter nose heavy.', icon: '⬇️' },
        'heavy-lift': { def: 'The capability to carry very large or heavy external loads.', comp: 'Tandem rotor helicopters excel at heavy-lift operations.', example: 'The CH-47 Chinook is a heavy-lift helicopter.', icon: '🏋️' },
        'offshore oil rigs': { def: 'Oil drilling platforms located in the ocean, often reached by helicopter.', comp: 'Helicopters transport workers and supplies to rigs far from shore.', example: 'Sikorsky S-92 helicopters serve offshore oil rigs worldwide.', icon: '🛢️' },
        'surveillance': { def: 'The close observation of an area or target from the air.', comp: 'Police and military helicopters use surveillance for monitoring.', example: 'A helicopter can hover overhead to provide continuous surveillance.', icon: '👁️' },
        'winches': { def: 'Mechanical devices used to raise or lower people and cargo from a hovering helicopter.', comp: 'Essential for rescue operations where landing is impossible.', example: 'Rescue crews use winches to lower a paramedic to an injured hiker.', icon: '🪢' },
        'thermal cameras': { def: 'Cameras that detect heat rather than visible light.', comp: 'Help find people in darkness, smoke, or dense vegetation.', example: 'Police helicopters use thermal cameras to track suspects at night.', icon: '🌡️' }
      };
    }
  },

  init() {
    this.load().then(() => {
      this.bindChips();
      this.renderGlossaryPage();
    });
  },

  bindChips() {
    document.querySelectorAll('.glossary-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const term = e.currentTarget.dataset.term;
        this.showPopup(term);
      });
    });
  },

  showPopup(term) {
    const info = this.terms[term.toLowerCase()];
    if (!info) return;
    let overlay = document.getElementById('glossary-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'glossary-modal';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = `
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="gloss-title">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-4)">
          <h3 id="gloss-title" style="margin:0;text-transform:capitalize">${term}</h3>
          <button class="btn btn-sm btn-secondary" onclick="Glossary.closePopup()" aria-label="Close">✕</button>
        </div>
        <p><strong>Definition:</strong> ${info.def}</p>
        <p><strong>Competition definition:</strong> ${info.comp}</p>
        <p><strong>Example:</strong> <em>${info.example}</em></p>
      </div>
    `;
    overlay.classList.add('open');
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closePopup();
    });
  },

  closePopup() {
    const overlay = document.getElementById('glossary-modal');
    if (overlay) overlay.classList.remove('open');
  },

  renderGlossaryPage() {
    const container = document.getElementById('glossary-content');
    if (!container) return;
    const range = container.dataset.range; // e.g., 'a-f'
    const [start, end] = range.split('-');
    const filtered = Object.entries(this.terms).filter(([term]) => {
      const first = term[0];
      return first >= start && first <= end;
    });

    let html = '';
    filtered.forEach(([term, info]) => {
      const link = this.termLinks[term];
      const termHtml = link
        ? `<a href="${link}" class="vocab-term-link" title="Learn more about ${term}">${term}</a>`
        : term;
      html += `
        <div class="vocab-card" data-term="${term}">
          <div class="vocab-term">${termHtml}</div>
          <div class="vocab-def">${info.def}</div>
          <div class="caption mt-2"><strong>Example:</strong> ${info.example}</div>
        </div>
      `;
    });
    container.innerHTML = html;
  },

  search(query) {
    query = query.toLowerCase();
    return Object.entries(this.terms).filter(([term, info]) => {
      return term.includes(query) || info.def.toLowerCase().includes(query);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Glossary.init());
