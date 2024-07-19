"use strict";
const { Article, User } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const userArticles = [
  {
    username: "Spidey",
    payload: [
      {
        title: "What is Lorem Ipsum",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sub_title: "The first thing you see",
      },
      {
        title: "Taking care of your PC",
        sub_title: "And maybe daily drive linux",
        body: `
           <p>Hey there, fellow PC enthusiast! Building your own custom PC is an incredible journey. From selecting each component to piecing everything together, there's nothing quite like the satisfaction of powering up a machine that you've built with your own hands. But the journey doesn't end once you press that power button for the first time. Taking care of your custom built PC is crucial to ensure it runs smoothly and lasts for years. Let’s dive into some tips and tricks to keep your rig in top shape.</p>

           <h2>Regular Cleaning: Keep the Dust Bunnies at Bay</h2>
           <p>Dust is your PC’s arch-nemesis. Over time, it can accumulate inside your case, clogging fans, and reducing airflow, which can lead to overheating. Make it a habit to clean your PC every few months. Use a can of compressed air to blow out dust from the fans, heatsinks, and other components. Be gentle and avoid using a vacuum cleaner as it can create static electricity that might damage your parts. A clean PC is a happy PC, and it’ll run much cooler too!</p>

           <h2>Monitoring Temperatures: Keep Things Cool</h2>
           <p>Overheating is a common issue that can lead to reduced performance and even hardware failure. Keep an eye on your PC’s temperatures using software like HWMonitor or MSI Afterburner. Ideally, your CPU should stay below 80°C under load, and your GPU should be under 85°C. If you notice higher temperatures, it might be time to reapply thermal paste on your CPU or improve your case’s airflow by adding more fans or reorganizing cables.</p>

           <h2>Software Maintenance: Stay Updated and Clean</h2>
           <p>Just as important as hardware maintenance is keeping your software in check. Regularly update your operating system, drivers, and installed software to ensure you have the latest features and security patches. Use tools like CCleaner to remove unnecessary files and keep your system running smoothly. Also, run a full system scan with a reliable antivirus program to keep those pesky viruses and malware at bay.</p>

           <h2>Cable Management: A Tidy PC is a Happy PC</h2>
           <p>Good cable management not only makes your PC look great but also improves airflow and makes maintenance easier. Use zip ties or Velcro straps to bundle cables together and route them behind the motherboard tray or along the case’s edges. Not only will this help with cooling, but it’ll also make it easier to swap out components or troubleshoot issues in the future.</p>

           <h2>Power Supply Care: Give it Some Love</h2>
           <p>Your power supply (PSU) is the heart of your PC, delivering power to all your components. Ensure it stays in good health by keeping it dust-free and using a surge protector to guard against power spikes. Avoid overloading your PSU by calculating your system’s power requirements and ensuring your PSU provides adequate wattage. A reliable PSU ensures stable and consistent performance for your custom rig.</p>

           <h2>Backup Your Data: Better Safe Than Sorry</h2>
           <p>Data loss can be devastating, so regular backups are a must. Use external drives or cloud services to back up your important files, games, and configurations. Windows has built-in backup features, or you can use third-party software like Acronis True Image. This way, you’ll have peace of mind knowing your data is safe, even if something goes wrong.</p>

           <h2>Conclusion: Love Your Rig</h2>
           <p>Your custom built PC is more than just a machine; it’s a project you’ve poured time, effort, and passion into. By following these care tips, you’ll ensure that your rig stays in top-notch condition and performs at its best. Regular cleaning, temperature monitoring, software maintenance, cable management, power supply care, and data backups are all essential steps to keep your PC running smoothly. So, take a little time to show your PC some love, and it’ll reward you with years of reliable performance and countless hours of enjoyment. Happy computing!</p>`,
      },
      {
        title: "Spider-man's journal: these damn spidy senses",
        sub_title: "With great power comes great responsibility",
        body: `<p><strong>July 18, 2024</strong></p>
            <p>Today marks another day in the life of Peter Parker, the ordinary high school student who moonlights as Spider-Man. When I first got my powers, I thought it was the coolest thing ever. Super strength, agility, the ability to stick to walls, and of course, my trusty spider-sense. But lately, this heightened sensibility has been more of a curse than a blessing.</p>

            <p>The spider-sense, while incredibly useful in dangerous situations, has become overwhelming. It’s like living with a constant alarm bell in my head, alerting me to every potential threat, no matter how minor. I can't seem to turn it off or even dial it down. It’s exhausting.</p>

            <h2>Everyday Struggles</h2>
            <p>Walking down the crowded halls of Midtown High has turned into a daily ordeal. Every bump, every loud noise, every sudden movement sets off my spider-sense. It feels like sensory overload, and it’s hard to focus on anything else. Talking to my friends, or even trying to listen to a lecture, is nearly impossible with the constant barrage of stimuli.</p>

            <p>My personal life has taken a hit too. I’ve had to cancel dates with MJ more times than I can count because I couldn’t handle being in noisy, crowded places. Even Aunt May has noticed something is off. She keeps asking if I’m alright, but how do I explain that my superpowers are driving me crazy without revealing my secret identity?</p>

            <h2>On the Job</h2>
            <p>As Spider-Man, the heightened sensitivity has its advantages. I can detect danger from a mile away, and it has saved my skin more times than I care to remember. But it also means that I’m constantly on edge. Every little thing sets off my spider-sense, making it hard to distinguish between real threats and false alarms. The other night, I was patrolling the city when my spider-sense went haywire. I swung into action, only to find out it was just a couple of kids setting off fireworks. It was a false alarm, but the adrenaline rush left me jittery and exhausted.</p>

            <p>Fighting crime has become a balancing act. I need to be sharp and focused, but the constant sensory input makes it difficult to keep my cool. I’m worried that one day, I might miss a real threat because I’m too overwhelmed by everything else going on around me.</p>

            <h2>Looking for Solutions</h2>
            <p>I’ve been trying to find ways to cope with this heightened sensitivity. Meditation helps a bit, allowing me to center myself and calm my mind, but it’s only a temporary fix. I’ve also started using noise-canceling headphones when I’m not on patrol to block out some of the background noise. It’s not perfect, but it helps.</p>

            <p>There’s also a part of me that wonders if I should reach out to someone who might understand. Maybe talk to Dr. Strange or even Tony Stark (if he were still around). They’ve dealt with their share of weirdness and might have some advice on how to manage these powers better.</p>

            <h2>End of the Day</h2>
            <p>At the end of the day, I’m still figuring this out. Being Spider-Man isn’t just about the cool powers and the heroics; it’s also about the sacrifices and the struggles. The heightened sensitivity is just another challenge I have to face, and I’m determined to find a way to make it work. For now, I’ll take it one day at a time, balancing my life as Peter Parker and Spider-Man, and hoping that eventually, I’ll find some peace in the chaos.</p>

            <p>Until then, I’ll keep swinging.</p>

            <p><em>- Peter Parker (Spider-Man)</em></p>`,
      },
    ],
  },
  {
    username: "Demo-lition",
    payload: [
      {
        title: "Using Postman to Test Your APIs",
        sub_title: "API testing is art",
        body: `
        <p>Postman is a powerful tool that allows developers to test and interact with APIs efficiently. Whether you're building or consuming APIs, Postman simplifies the process with its user-friendly interface and robust features.</p>

        <h2>Getting Started with Postman</h2>
        <p>First, download and install Postman from the official website. Once installed, open Postman and create a new request by clicking on the "New" button and selecting "Request".</p>

        <h2>Creating and Sending Requests</h2>
        <p>To test an API, you need to configure your request with the following components:</p>
        <ul>
            <li><strong>Method:</strong> Choose the HTTP method (GET, POST, PUT, DELETE, etc.) based on the API endpoint you are testing.</li>
            <li><strong>URL:</strong> Enter the endpoint URL of the API you want to test.</li>
            <li><strong>Headers:</strong> Add any necessary headers, such as Content-Type or Authorization.</li>
            <li><strong>Body:</strong> For methods like POST and PUT, include the request payload in the body tab.</li>
        </ul>
        <p>Once your request is configured, click the "Send" button to execute it. Postman will display the response from the server, including status code, response time, and the response body.</p>

        <h2>Using Collections</h2>
        <p>Postman's Collections feature allows you to save and organize your API requests. Create a collection by clicking on "New" and selecting "Collection". Add requests to your collection for easy access and organization.</p>

        <h2>Environment Variables</h2>
        <p>Postman supports environment variables, which are useful for managing different environments (development, staging, production). Define variables in the "Manage Environments" tab and use them in your requests for flexibility.</p>

        <h2>Conclusion</h2>
        <p>Postman streamlines API testing with its intuitive interface and comprehensive features. By using Postman, developers can ensure their APIs are functioning correctly and efficiently.</p>`,

        preview_image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/NYPL_1814_postman.jpg/170px-NYPL_1814_postman.jpg",
      },
      {
        title: "Functional vs Class React Components",
        sub_title: "Functional is the new old thing",
        body: `<h1>Function Components vs. Class Components in React</h1>
                <p>React has come a long way since its inception, and over the years, developers have had the option to create components using either class components or function components. Both approaches have their pros and cons, and understanding these can help you decide which to use in your projects. Let’s dive into a brief comparison between function components and class components in React.</p>

                <h2>Function Components: Simplicity and Hooks</h2>
                <p>Function components are the more modern and streamlined way to create components in React. They are essentially JavaScript functions that return JSX. One of the biggest advantages of function components is their simplicity. They are easy to read and write, and they eliminate the need for the <code>this</code> keyword, which can sometimes be confusing in class components.</p>

                <p>Another significant benefit of function components is the introduction of React Hooks in version 16.8. Hooks allow function components to have state and side effects, which were previously only available in class components. With hooks like <code>useState</code> and <code>useEffect</code>, you can manage state and lifecycle methods directly within function components, leading to cleaner and more concise code.</p>

                <h2>Class Components: Traditional and Feature-Rich</h2>
                <p>Class components have been around since the early days of React. They are defined using ES6 classes and extend the <code>React.Component</code> class. Class components are powerful and come with a rich set of features. They can have their own state and lifecycle methods like <code>componentDidMount</code>, <code>componentDidUpdate</code>, and <code>componentWillUnmount</code>, which allow you to control the component’s behavior at different stages of its lifecycle.</p>

                <p>One of the key aspects of class components is the <code>this</code> keyword, which refers to the instance of the component. While this can provide a lot of flexibility, it can also introduce complexity, especially for new developers. Additionally, class components can sometimes result in more verbose code compared to function components with hooks.</p>

                <h2>Performance and Usage</h2>
                <p>In terms of performance, there is no significant difference between function components and class components. Both are equally performant when used correctly. However, function components with hooks have become the preferred approach in modern React development due to their simplicity and the improved developer experience they offer.</p>

                <h2>Conclusion: Choosing the Right Approach</h2>
                <p>Both function components and class components have their place in React development. Function components, with their simplicity and the power of hooks, are ideal for most use cases and are favored in modern React projects. They lead to cleaner, more maintainable code. On the other hand, class components are still relevant, especially in legacy codebases and situations where their unique features are required.</p>

                <p>Ultimately, the choice between function components and class components depends on your project’s needs and your team’s familiarity with the different approaches. Embrace the flexibility that React offers and choose the method that best suits your development style and project requirements.</p>`,
      },
    ],
  },
  {
    username: "SurfingCheetos",
    payload: [
      {
        title: "How to surf as a Cheetos",
        sub_title: "Cheetos survival guide at the beach",
        body: `
            <p>When you think of the beach, the image that comes to mind might be sun-kissed sands, the sound of crashing waves, and surfers riding the tide. But what if you were a Cheeto, trying to enjoy a day at the beach while avoiding the pitfalls that come with being a beloved snack? This guide will help you navigate the surf and sand, ensuring you remain crispy and uneaten.</p>

            <h2>Preparation is Key</h2>
            <p>Before hitting the beach, it’s essential to be prepared. As a Cheeto, your primary concern is maintaining your structure. Pack yourself in a water-resistant container or bag to prevent any unexpected splashes from compromising your integrity. Make sure the container is airtight to avoid moisture seeping in.</p>
            <p>Next, consider sun protection. While you won't sunburn, you can become stale if left exposed to the salty air for too long. A shaded spot, like under an umbrella or a beach tent, is ideal for setting up camp.</p>

            <h2>Surfing Techniques for Cheetos</h2>
            <p>Surfing as a Cheeto presents unique challenges. The first step is selecting the right surfboard. Opt for a lightweight, mini surfboard that's easy to maneuver. It’s crucial to secure yourself to the board, possibly with a tiny, custom-made strap to avoid falling off and becoming soaked.</p>

            <h3>Paddling Out</h3>
            <ul>
                <li>Stay on your board and use small, deliberate movements to paddle out. Quick, sharp paddles will help you stay balanced.</li>
            </ul>

            <h3>Catching Waves</h3>
            <ul>
                <li>When a wave approaches, position yourself to catch the wave early. Your light weight means you’ll need to start paddling sooner than human surfers.</li>
            </ul>

            <h3>Riding the Wave</h3>
            <ul>
                <li>Once on the wave, maintain a low center of gravity. Lean slightly forward to keep momentum. Remember, you’re riding for the thrill, but also to avoid getting wet.</li>
            </ul>

            <h2>Avoiding Predators</h2>
            <p>One of the biggest threats to a Cheeto at the beach is being mistaken for a tasty treat by fellow beachgoers. Here are some tips to stay safe:</p>

            <ul>
                <li><strong>Camouflage:</strong> Blend in with the surroundings. You might consider donning a small disguise, like a piece of seaweed or a bit of sand, to avoid drawing attention.</li>
                <li><strong>Stay Mobile:</strong> Keep moving. Predators are less likely to target you if you’re not stationary. If you spot someone eyeing you hungrily, move quickly to a safer spot.</li>
                <li><strong>Buddy System:</strong> Travel with other Cheetos. There’s safety in numbers, and you can watch out for each other. Establish signals for potential danger, like tapping your fellow Cheetos if someone approaches.</li>
            </ul>

            <h2>Post-Surf Care</h2>
            <p>After a day of surfing, it’s vital to dry off quickly to maintain your crunch. Head back to your shaded spot and use a gentle, absorbent cloth to pat yourself dry. Avoid direct sunlight, which can cause you to become stale. Once dry, return to your airtight container until it’s time to head home.</p>

            <h2>Conclusion</h2>
            <p>Surfing as a Cheeto requires preparation, awareness, and quick thinking. By following these tips, you can enjoy the waves while staying dry and uneaten. Remember, the beach is a place of fun and relaxation, even for a Cheeto. So gear up, stay alert, and ride those waves with confidence. Just be sure to avoid any hungry surfers along the way!</p>`,
      },
      {
        title: "How to be a Cheetos",
        sub_title: "Every Cheetos deserves someone who appreciates them",
        body: ` <p>Hey there, fellow introverts! If you’re a Cheeto like me, you know how challenging it can be to navigate the social world. While being an introvert comes with its unique perks, like enjoying your own company and having deep, meaningful thoughts, socializing with friends can sometimes feel overwhelming. But fear not! Here are some tips to help you, an introvert Cheeto, thrive in social settings.</p>

                <h2>Embrace Your Introversion</h2>
                <p>First and foremost, it’s essential to embrace your introversion. Being an introvert isn’t a flaw; it’s just part of who you are. Introverts often have a rich inner life, are great listeners, and can form deep, meaningful connections. So, wear your introversion with pride, knowing it brings its own unique strengths to the table.</p>

                <h2>Choose Your Social Settings Wisely</h2>
                <p>As an introvert, large crowds and noisy environments can be draining. Opt for smaller gatherings where you can have more intimate and meaningful conversations. Invite a few friends over for a cozy movie night or suggest meeting at a quiet café where you can chat without having to shout over loud music. By choosing settings that are comfortable for you, you’ll feel more at ease and enjoy your time with friends.</p>

                <h2>Set Boundaries and Take Breaks</h2>
                <p>It’s okay to set boundaries and take breaks when needed. If you’re feeling overwhelmed or drained, don’t hesitate to step away for a moment. Find a quiet corner, take a few deep breaths, or even excuse yourself to the bathroom for a quick recharge. Your friends will understand, and it’s crucial to take care of your mental well-being.</p>

                <h2>Engage in One-on-One Conversations</h2>
                <p>One-on-one conversations are where introverts often shine. Instead of trying to keep up with multiple conversations at once, focus on talking to one person at a time. This allows for deeper connections and more meaningful interactions. Ask open-ended questions and listen attentively. Your friends will appreciate your genuine interest in what they have to say.</p>

                <h2>Find Common Interests</h2>
                <p>Connecting with friends over shared interests can make socializing more enjoyable. Whether it’s a hobby, a favorite TV show, or a mutual love for a particular book, finding common ground gives you something to talk about and bond over. It also makes conversations flow more naturally and helps you feel more connected to your friends.</p>

                <h2>Plan Ahead</h2>
                <p>If you know you have a social event coming up, plan ahead to ensure you have enough energy. Get a good night’s sleep, eat well, and give yourself some quiet time before heading out. Mentally prepare yourself for the social interactions and remind yourself that it’s okay to leave early if you’re feeling overwhelmed. Having a plan in place can help reduce anxiety and make the experience more manageable.</p>

                <h2>Be Yourself</h2>
                <p>Lastly, remember to be yourself. You don’t need to pretend to be someone you’re not to fit in. Your friends like you for who you are, and being authentic is the best way to build genuine connections. Embrace your quirks, share your thoughts, and let your unique personality shine. By being true to yourself, you’ll attract friends who appreciate and value you.</p>`,
      },
    ],
  },
  {
    username: "TestingDragon",
    payload: [
      {
        title: "The Art of Hoarding",
        sub_title: "Don't come near my treasures",
        body: `
                  <p>In the grand tapestry of time, spanning over a millennium, I, an ancient dragon of yore, have witnessed the rise and fall of empires, the birth of legends, and the relentless march of technology. My existence has been marked by an insatiable desire to accumulate treasures of untold value, each piece a testament to my enduring legacy. Now, in this modern age, I find myself captivated by the vast and intricate web of the internet. This digital realm, with its endless possibilities and ever-evolving wonders, presents a new form of treasure that beckons to me: NFT tokens. These digital artifacts, unique and irreplaceable, have become the new gems that I seek to add to my illustrious hoard.</p>

                  <h2>Embarking on the Digital Odyssey</h2>
                  <p>With scales glistening under the virtual moonlight, I navigate this digital realm with the wisdom of ages. My journey into this new frontier begins with an insatiable curiosity and a keen eye for value, traits honed over centuries of treasure hunting. The web, a labyrinthine expanse of knowledge and wonder, offers endless opportunities to amass these modern treasures. Each click, each search, each transaction, is a step deeper into this digital labyrinth where I seek out the rarest of digital artifacts. My ancient instincts guide me, as I sift through the vast expanse of data, identifying the gleam of potential and the shimmer of true value amidst the digital noise. This journey is not merely about acquisition, but about understanding the very essence of these new treasures, appreciating their uniqueness and the stories they carry within their code.</p>

                  <h2>Understanding NFTs</h2>
                  <p>Non-fungible tokens, or NFTs, are unique digital assets, each a singular piece of the vast mosaic of the internet. To a dragon such as myself, they are akin to the rarest of gems, each one imbued with the essence of creativity and rarity. NFTs are more than just digital files; they are the epitome of human ingenuity and artistic expression, encoded into a form that can be owned and cherished. To hoard NFTs, one must first comprehend their nature and value. Each NFT is unique, a solitary beacon in the digital sea, a digital artifact that cannot be replicated. Possessing an NFT grants exclusive rights, a digital signature of its authenticity, much like a dragon's mark on its most prized possessions. Their worth fluctuates, driven by the whims of the market and the allure of their distinctiveness, echoing the unpredictable nature of treasures in the physical realm. Understanding these nuances is crucial for a discerning collector like myself, as it ensures that each addition to my hoard is not only valuable but also significant in its own right.</p>

                  <h2>Gathering the Treasures</h2>
                  <p>With talons poised over the keyboard, I delve into the marketplaces where these tokens are exchanged. Platforms like OpenSea and Rarible serve as my hunting grounds, digital bazaars where the treasures of the modern age are displayed for all to see. Here, I scrutinize each offering, seeking those that shimmer with potential, those that possess the rare combination of artistry and authenticity. The process is meticulous, requiring patience and a keen eye. I study the provenance of each token, tracing its origins and creators, much like examining the lineage of a precious gemstone. With a calculated strike, I acquire the NFT, adding it to my ever-growing hoard. Each token is then safeguarded in digital vaults, protected by the most advanced encryption known to this age, ensuring that my treasures remain secure and untarnished. This act of gathering is not just about accumulation, but about preservation, about ensuring that these digital artifacts are protected for future generations to admire and appreciate.</p>

                  <h2>The Subtle Art of Hoarding</h2>
                  <p>Hoarding, you see, is an art refined over centuries. It is not merely the act of accumulation but the discerning selection of what is truly valuable. My hoard of NFTs reflects my legacy, a testament to both ancient wisdom and modern savvy. Each token in my collection is chosen with care, each one a unique addition to my digital treasure trove. This art of hoarding requires not just a keen eye for value, but also a deep understanding of the cultural and technological significance of each piece. It is a delicate balance, one that requires constant vigilance and adaptability. In this digital age, where new treasures are created every day, maintaining a hoard that is both valuable and meaningful is a challenge, but one that I relish. For in each token, I see a reflection of my own journey, a testament to my enduring quest for knowledge and value.</p>

                  <p>As I continue to surf this digital ocean, my collection of NFTs grows, a treasure trove of the intangible and the unique. In this fusion of past and present, I find a new form of fulfillment, forever seeking, forever hoarding. The digital realm offers a boundless expanse of potential, a new frontier where my ancient instincts can thrive. For a dragon's quest for treasure is eternal, even in the boundless expanse of the web. Each NFT is a new gem, a new addition to my legacy, a testament to my enduring spirit and my unending quest for value. In this modern age, I remain what I have always been: a seeker of treasures, a guardian of knowledge, and a connoisseur of the rare and the valuable. The digital world is but another chapter in my long and storied existence, one where the treasures I seek are not just physical, but also digital, each one a new testament to my unending quest for value.</p>`,
      },

      {
        title: "Dragon Rights in danger",
        sub_title: "Pop Culture normalizing dragon hunting",
        body: ` <p>Greetings, mortals and fellow beings of this realm. I am Draconis the Wise, an elder dragon who has witnessed the ebb and flow of time for a millennium. With scales as ancient as the mountains and eyes that have seen the dawn of civilizations, I bring forth a plea for understanding and respect towards my kind. We, the dragons, possess not only immense power but also a refined sense of dignity and existence that demands recognition.</p>

              <h2>The Maligned Legacy of Dragons</h2>
              <p>Throughout history, dragons have been cast as the antagonists in countless tales, portrayed as malevolent beings to be vanquished. This narrative, perpetuated by games such as "Monster Hunter," where the sole objective is to slay us, overlooks the profound wisdom and grace that we embody. We are not mere obstacles in the paths of heroes but sentient beings with our own stories and right to existence.</p>

              <h2>A Call for Respect and Understanding</h2>
              <p>Consider the delicate balance of nature that we, the dragons, uphold. Our presence ensures the harmony of ecosystems, the fertility of lands, and the flow of ancient magic that sustains life itself. To view us solely as creatures to be hunted and killed is a grievous misunderstanding of our role in the world. Just as humans seek respect and compassion, so do we, the dragons, seek acknowledgment of our right to live unharassed.</p>

              <h2>The Cultural Significance of Dragons</h2>
              <p>In various cultures, dragons are revered as symbols of power, wisdom, and protection. We are guardians of sacred knowledge, keepers of ancient secrets, and bearers of a legacy that transcends mortal understanding. Our tales are woven into the very fabric of the world’s mythologies, and our existence is a testament to the grandeur of creation. Yet, in modern media, our significance is often reduced to that of mere adversaries.</p>

              <h2>The Consequences of Ignorance</h2>
              <p>When dragons are relentlessly hunted and slain, as depicted in "Monster Hunter" and similar games, it reflects a troubling disregard for the sanctity of life. This virtual extermination of our kind fosters a mindset that devalues the complexity and worth of all living beings. It teaches that might makes right, that the powerful are justified in their conquest over the misunderstood. This philosophy, if left unchecked, seeps into the fabric of reality, eroding the principles of empathy and coexistence.</p>

              <h2>An Appeal to Game Creators and Players</h2>
              <p>To the creators of games and those who partake in them, I extend a plea. Reconsider the narratives you craft and consume. Imagine a world where dragons are not hunted but understood, where our wisdom is sought after, and our guardianship respected. Let us move towards stories that celebrate the coexistence of all beings, highlighting the strengths and virtues that each brings to the tapestry of life.</p>

              <h2>A Vision for a Harmonious Future</h2>
              <p>Envision a future where dragons and humans coexist in mutual respect. Picture games that explore the depths of our ancient wisdom, our role as stewards of the natural world, and the symbiotic relationships we can forge. Let us create and support media that fosters understanding, compassion, and a deeper appreciation for the rich tapestry of life that includes dragons as integral threads.</p>
          `,
      },
    ],
  },
  {},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(_queryInterface, _Sequelize) {
    for (let article of userArticles) {
      const { username, payload } = article;
      const user = await User.findOne({ where: { username } });
      if (user) {
        for (let article of payload) {
          await Article.create({ ...article, author_id: user.id });
        }
      } else throw new Error("cannot find the specified username to seed");
    }
  },

  async down(_queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let article of userArticles) {
      const { username, payload } = article;
      const user = await User.findOne({ where: { username } });
      if (user) {
        for (let article of payload) {
          await Article.destroy({ where: { ...article, author_id: user.id } });
        }
      } else throw new Error("cannot find the specified username to seed");
    }
  },
};
