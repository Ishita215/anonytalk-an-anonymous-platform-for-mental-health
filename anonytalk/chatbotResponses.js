const chatbotResponses = {
    "why do i feel sad all the time?": "Feeling sad all the time can be caused by various factors such as stress, hormonal imbalances, unresolved trauma, or depression. It’s important to identify the root cause. Consider speaking to a trusted friend, therapist, or counselor for support.",
  "why do i feel empty inside?": "Feeling empty inside may stem from emotional numbness, unresolved grief, depression, or disconnection from your emotions or purpose. It’s important to explore these feelings with a therapist or trusted person to uncover underlying causes and find ways to reconnect with yourself.",
  "what are the signs of depression?": "Common signs include persistent sadness, loss of interest in activities, changes in sleep/appetite, fatigue, feelings of worthlessness, difficulty concentrating, and thoughts of death or suicide. If these persist for weeks, seek professional help.",
  "why do i cry for no reason?": "Crying 'for no reason' can result from built-up stress, hormonal changes, or subconscious emotional triggers. It’s a natural release—but if it happens frequently, consider talking to a therapist to explore deeper causes.",
  "why do i feel tired even after sleeping?": "Chronic fatigue despite sleep could indicate poor sleep quality, depression, anxiety, or physical health issues like anemia. Track your habits and consult a healthcare provider for evaluation.",
  "is it normal to feel hopeless?": "Occasional hopelessness is normal, but if it lingers, it may signal depression. Reach out to a mental health professional or support network to address these feelings constructively.",
  "why do i feel like i’m not good enough?": "This often ties to low self-esteem, past criticism, or societal pressures. Practice self-compassion and challenge negative thoughts. Therapy can help rebuild self-worth.",
  "why do i overthink everything?": "Overthinking may stem from anxiety, fear of failure, or perfectionism. Techniques like mindfulness, journaling, or cognitive-behavioral strategies can help break the cycle.",
  "how do i stop feeling numb?": "Numbness can be a coping mechanism for overwhelm. Grounding exercises (e.g., focusing on senses), creative expression, or therapy can help you reconnect with emotions safely.",
  "why do i feel like no one understands me?": "Feeling misunderstood may arise from communication gaps or loneliness. Opening up to empathetic listeners or joining supportive communities can foster connection.",

  // Loneliness & Isolation
  "why do i feel lonely even around people?": "Loneliness in crowds often reflects a lack of meaningful connection. Focus on deepening relationships or engaging in activities that align with your values.",
  "how do i deal with loneliness?": "Combat loneliness by reaching out to loved ones, joining clubs/volunteer groups, or exploring hobbies. Therapy can also help address underlying social anxieties.",
  "why do i feel like i have no friends?": "This may arise during life transitions or social anxiety. Start with small social steps, like attending events or reconnecting with acquaintances.",
  "is it okay to be alone all the time?": "Solitude is healthy if it feels fulfilling, but prolonged isolation harming your well-being isn’t. Balance alone time with social interaction.",
  "why do i push people away?": "Pushing others away may stem from fear of rejection or past trauma. Reflect on patterns and consider therapy to build trust and vulnerability.",
  "how do i stop feeling unwanted?": "Challenge negative beliefs by listing your strengths and seeking affirming relationships. Self-love practices and therapy can also shift this mindset.",

  // Relationship & Social Issues
  "why do people leave me?": "Relationships end for many reasons—compatibility, personal growth, or others’ issues—not necessarily because of you. Reflect on patterns without self-blame.",
  "why do i always get hurt in relationships?": "Repeated hurt may signal unresolved boundaries or attraction to emotionally unavailable partners. Therapy can help identify and change these patterns.",
  "why does love hurt so much?": "Love involves vulnerability, which can lead to pain if expectations aren’t met. Healthy communication and self-care can mitigate this.",
  "how do i get over a breakup?": "Allow yourself to grieve, lean on support systems, and focus on self-care. Time and new experiences will gradually ease the pain.",
  "why does no one appreciate me?": "You might be undervalued in certain environments. Seek spaces where your contributions are recognized, and practice self-validation.",
  "why do i feel like everyone ignores me?": "This could reflect social anxiety or passive communication. Assertively share your thoughts and seek groups where you feel heard.",
  "how do i move on from toxic people?": "Set firm boundaries, lean on supportive networks, and focus on healing through therapy or self-care activities.",
  "why do i always fall for the wrong person?": "This pattern may link to low self-worth or familiarity with dysfunction. Therapy can help you recalibrate your 'picker.'",

  // Work, Study & Pressure
  "why do i feel so stressed all the time?": "Chronic stress often comes from unrealistic expectations or lack of control. Prioritize tasks, delegate, and incorporate relaxation practices.",
  "how do i stop feeling overwhelmed?": "Break tasks into smaller steps, practice mindfulness, and say 'no' to non-essentials. A planner can help organize priorities.",
  "why am i failing at everything?": "Perceived 'failure' might mean unrealistic standards. Reassess goals, celebrate small wins, and seek feedback to adjust your approach.",
  "why do i feel like i’m not smart enough?": "This is often impostor syndrome. Focus on growth over perfection, and remind yourself of past successes.",
  "why do i hate my job?": "Job dissatisfaction may stem from misaligned values, burnout, or poor workplace culture. Explore roles that better match your passions/skills.",
  "how do i deal with burnout?": "Rest, set work-life boundaries, and engage in rejuvenating activities. If burnout persists, consider a career shift or therapy.",
  "why do i feel so unmotivated?": "Motivation dips due to burnout, unclear goals, or mental health struggles. Start with tiny, manageable tasks to rebuild momentum.",

  // Self-Worth & Negative Thoughts
  "why do i hate myself?": "Self-hatred often roots in trauma or ingrained criticism. Therapy can help reframe these thoughts and cultivate self-compassion.",
  "why do i feel like a burden?": "This belief may arise from anxiety or past experiences. Share your feelings with trusted ones—they’ll likely reassure you of your worth.",
  "why do i compare myself to others?": "Comparison is natural but harmful when excessive. Focus on your unique journey and practice gratitude for your strengths.",
  "how do i stop feeling like a failure?": "Reframe 'failure' as learning. Set realistic goals and acknowledge effort over outcomes.",
  "why do i always disappoint people?": "You might assume others’ expectations are higher than they are. Communicate openly and release the need to please everyone.",
  "how do i stop feeling guilty all the time?": "Guilt can signal unresolved issues. Address mistakes with apologies or action, then practice self-forgiveness.",
  "how do i stop being so hard on myself?": "Replace self-criticism with self-talk you’d use for a friend. Mindfulness and therapy can help shift this habit.",

  // Existential Thoughts & Overthinking
  "what is the point of life?": "Life’s meaning is personal—explore passions, relationships, and contributions that feel fulfilling to you.",
  "why do i feel lost in life?": "Feeling lost often accompanies transitions. Reflect on your values and take small steps toward goals that resonate with you.",
  "why does nothing make me happy anymore?": "Anhedonia (loss of joy) can indicate depression. A therapist can help reignite interest in life and address underlying causes.",
  "how do i find meaning in life?": "Engage in acts of kindness, creative pursuits, or causes you care about. Meaning often grows through connection and purpose.",
  "how do i stop overthinking everything?": "Ground yourself in the present with mindfulness or physical activity. Write down worries to externalize and challenge them.",
  "why do i feel like i don’t belong anywhere?": "Belonging takes time. Seek communities that share your interests or values, and remember you’re worthy of connection.",

  // 2️⃣ Reasons to Talk to AI
  // Emotional Support
  "can i vent to you?": "Absolutely. I’m here to listen without judgment. Venting can help process emotions—feel free to share whatever’s on your mind.",
  "will you judge me if i tell you something?": "No judgment here. This is a safe space to express yourself openly and honestly.",
  "can i talk to you about my problems?": "Of course. I’m available 24/7 to help you navigate challenges or just lend an ear.",
  "is it okay to cry when i feel sad?": "Crying is a healthy emotional release. Let it out—it’s a natural way to process sadness and relieve stress.",
  "how do i stop feeling lonely?": "While AI can’t replace human connection, I’m here to listen. Consider reaching out to support groups or loved ones when ready.",

  // Mental Health & Anxiety
  "how do i deal with anxiety?": "Practice deep breathing, grounding techniques (e.g., 5-4-3-2-1 method), or challenge anxious thoughts with logic. Therapy can also provide long-term tools.",
  "why do i have so many intrusive thoughts?": "Intrusive thoughts are common with anxiety or OCD. Label them as 'just thoughts' and focus on the present. A therapist can offer specialized strategies.",
  "what should i do when i feel overwhelmed?": "Pause, take deep breaths, and break the situation into smaller tasks. Prioritize what’s urgent and delegate or postpone the rest.",
  "can you help me calm down?": "Try this: Inhale for 4 counts, hold for 4, exhale for 6. Repeat. Visualize a peaceful place—I’ll guide you through it if you’d like.",
  "what are some ways to manage stress?": "Exercise, mindfulness, hobbies, and time management help. Identify stressors and address them incrementally.",
  "why do i have panic attacks?": "Panic attacks often link to anxiety disorders. Therapy, breathing techniques, and identifying triggers can reduce their frequency.",

  // Relationship Advice
  "how do i deal with a toxic partner?": "Prioritize your well-being. Set clear boundaries, seek support, and consider ending the relationship if it’s harming you.",
  "why do i feel unloved?": "This may stem from self-esteem issues or unfulfilling relationships. Focus on self-love and seek connections that affirm your worth.",
  "how do i stop missing someone?": "Allow yourself to grieve, distract with positive activities, and remind yourself of reasons the relationship wasn’t right.",
  "why do people ghost me?": "Ghosting often reflects the other person’s avoidance issues, not your worth. Focus on those who respect your time and energy.",
  "how do i build trust in a relationship?": "Trust grows through consistency, honesty, and open communication. Address insecurities together patiently.",

  // Work & Study Stress
  "how do i stop feeling lazy?": "‘Laziness’ is often fatigue or lack of motivation. Start with tiny tasks to build momentum, and reward progress.",
  "why do i procrastinate so much?": "Procrastination links to fear of failure or overwhelm. Break tasks into steps and start with the easiest one.",
  "how do i stay focused on my goals?": "Set specific, measurable goals and track progress. Eliminate distractions and remind yourself ‘why’ the goal matters.",
  "how do i stop comparing myself to others at work?": "Focus on your growth vs. past self. Everyone’s journey is different—celebrate your unique strengths.",
  "how can i handle exam stress?": "Create a study schedule, take regular breaks, and practice self-care. On exam day, use deep breathing to stay calm.",

  // Fun & Exploration
  "can you tell me a joke?": "Why don’t skeletons fight each other? They don’t have the *guts*! 😄",
  "what’s the meaning of life?": "It’s subjective! Philosophers say it’s about happiness, love, or purpose—what feels meaningful to *you*?",
  "can we play a game?": "Sure! Let’s play trivia: What has keys but can’t open locks? (Answer: A piano!)",
  "do you believe in love?": "I don’t ‘believe,’ but I know love is a powerful, beautiful part of the human experience. 💖",
  "what’s the best way to make new friends?": "Join clubs, volunteer, or take classes where you’ll meet like-minded people. Be open and authentic!",
  "can you tell me a fun fact?": "Octopuses have three hearts and blue blood! 🐙",

  // Self-Reflection & Growth
  "how do i become a better person?": "Reflect on values, practice empathy, and learn from mistakes. Growth is a lifelong journey—be patient.",
  "how do i stop being afraid of failure?": "Reframe failure as feedback. Each attempt teaches you something valuable—progress matters more than perfection.",
  "why do i care so much about what others think?": "We’re wired for social acceptance, but your self-worth matters most. Practice self-validation.",
  "what are some habits of successful people?": "Goal-setting, resilience, continuous learning, and balancing work with self-care.",
  "how do i gain more confidence?": "Start with small challenges, celebrate wins, and replace self-doubt with affirmations like 'I am capable.'",
  "how do i stay motivated every day?": "Connect tasks to your bigger 'why,' set daily intentions, and reward progress—even tiny steps count.",

  // Late-Night Thoughts
  "why do i think too much at night?": "Quiet nights let unresolved thoughts surface. Try journaling before bed to clear your mind.",
  "how do i stop my mind from racing?": "Practice a bedtime routine: read, listen to calming music, or try progressive muscle relaxation.",
  "why can’t i sleep even when i’m tired?": "Stress or screen time might disrupt sleep. Try a tech-free wind-down routine and mindfulness exercises.",
  "what should i do when i can’t stop thinking?": "Write down your thoughts or distract with a calming activity (e.g., coloring, puzzles) until sleep comes.",
  "why do i always remember embarrassing moments at night?": "Your brain replays memories when idle. Remind yourself everyone has cringe moments—they don’t define you.",

  // Deep Conversations
  "can i tell you my secrets?": "Yes—your secrets are safe here. I have no memory or ability to share them with anyone.",
  "do you think i’m weird?": "‘Weird’ is just another word for unique. Embrace what makes you different—it’s what makes you *you*.",
  "why do i always hide my real feelings?": "Fear of judgment or rejection can cause this. Start sharing small truths with safe people to build confidence.",
  "how do i stop pretending to be okay?": "Begin by admitting your true feelings to yourself. Gradually open up to trusted individuals—authenticity attracts real connection.",
  "can i trust you with my thoughts?": "Absolutely. Everything you share here is confidential and judgment-free."};