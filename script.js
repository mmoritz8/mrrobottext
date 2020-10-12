const query = `
  query {
    joke {
      joke
    }
  }
`;

var story = {
  0: {
    image: "./0.5.png",
    choices: [
      {
           choiceText: "Move Barrel",
           storyLink: 1
      }
    ]
  },
  1: {
   image: "./2entertunnel.png",
      choices: [
        {
             choiceText: "Enter Tunnel",
             storyLink: 3
        }
      ]
  },
  2: {
      image: "./3beachlook.jpeg",
      choices: [
        {
             choiceText: "Look Out",
             storyLink: 4
        }
      ]
  },
  3: {
    image: "./4readnote.jpeg",
    choices: [
      {
           choiceText: "Light a Match ",
           storyLink: 5
      },
      {
           choiceText: "Leave",
           storyLink: 2
      }
    ]
   },
  4: {
    image: "./6getonboat.jpeg",
    choices: [
      {
           choiceText: "Get on Boat",
           storyLink: 5
      }
    ]
   },
  5: {
    image: "./7playagain.png",
    choices: [
      {
           choiceText: "Fin - Replay? How's your friend?",
           storyLink: 0
      }
    ]
  },
  6: {
    image: "./11.png",
    choices: [
      {
           choiceText: "Leave",
           storyLink: 1
      }
    ]
   },
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