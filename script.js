const query = `
  query {
    joke {
      joke
    }
  }
`;

var story = {
  0: {
    image: "./assets//1.2move.jpeg",
    choices: [
      {
           choiceText: "Move Barrel",
           storyLink: 1
      }
    ]
  },
  1: {
   image: "./assets/2entertunnel.png",
      choices: [
        {
             choiceText: "Enter Tunnel",
             storyLink: 2
        }
      ]
  },
  2: {
      image: "./assets/3beachlook.jpeg",
      choices: [
        {
             choiceText: "Look Out",
             storyLink: 3
        }
      ]
  },
  3: {
    image: "./assets/4readnote.jpeg",
    text: "It's too dark...",
    choices: [
      {
           choiceText: "Leave ",
           storyLink: 4
      },
      {
           choiceText: "Light a Match",
           storyLink: 7
      }
    ]
   },
  4: {
    image: "./assets/6getonboat.jpeg",
    choices: [
      {
           choiceText: "Get on Boat",
           storyLink: 5
      }
    ]
   },
  5: {
    image: "./assets/7playagain.png",
    choices: [
      {
           choiceText: "Fin - Replay? How's your friend?",
           storyLink: 0
      }
    ]
  },
  6: {
    image: "./assets/1.2move.jpeg",
    choices: [
      {
           choiceText: "Leave",
           storyLink: 1
      }
    ]
  },
  7: {
    image: "./assets/1.2move.jpeg",
    choices: [
      {
           choiceText: "Sit with friend.",
           storyLink: 8
      }
    ]

  },
    8: {
    image: "./assets/bookphone.jpeg",
    choices: [
      {
           choiceText: "Stay.",
           storyLink: 5
      }
    ]

  }
}

function GameViewModal() {
     self.currentScene = 0;
     self.gameOn = ko.observable(false);
     self.gameImg = ko.observable(null);
     self.gameText = ko.observable("A Text Adventure Game");
     self.gameChoices = ko.observable([]);

     self.startGame = function() {
       fetch(`https://icanhazdadjoke.com/graphql?query=${query}`)
        .then(response => response.json())
        .then(data => {
          console.log((data.data.joke.joke));
          self.loadJokes(data.data.joke.joke);
          self.gameOn(true);
          var startingStoryLink = {
            storyLink: 0
          }
          self.changeScene(startingStoryLink);
        });
     }

     self.changeScene = function(newScene) {
       console.log(JSON.stringify(newScene));
       self.currentScene = newScene.storyLink;
       self.gameText(story[self.currentScene].text);
       if(story[self.currentScene].image){
         self.gameImg(story[self.currentScene].image);
       }
       else{
         self.gameImg(null);
       }
       self.gameChoices(story[self.currentScene].choices);
       console.log(self.gameChoices, story[3].text);
     }

  self.loadJokes = function(jokes){
    story[3].text = jokes;
  }
 };

ko.applyBindings(new GameViewModal());