# About the game
This was my first digital protoype. It's my take on the numbers round from the British TV show *Countdown*. I made it partly as an exercise to build up my React skills, and partly because I just really like Countdown.

In the original TV show, the aim of the numbers round is to make a three digit target number by combining a pool of six smaller numbers. The players get 30 seconds to do this, and points are awarded to whichever players make the total or gets closest.

In my take on the game, I've made a few changes.
 
- Firstly, I've extended the game to include multiple rounds. When you hit the target number, you now score a point, then get assigned a new number, and continue with the same pool of numbers to work with.
- Secondly, you're not under time pressure- instead, you have a fixed number of moves you can make.

It's still a work in progress, but the core logic is there. I'm planning to add fancy CSS animations, and maybe tweak the difficulty algorithm a bit.

# How To Play
## Objective
Your objective is to make the target number shown. To do this, you're given six numbers, which you can add together, subtract, multiply or divide.

When you hit the target number, you score a point, and a new target is assigned.

You have a limited number of moves you can make. Every time you reach a target, you get 3 more moves. When you run out of moves, the game ends, and your score is the number of targets you managed to hit.

## Combining numbers
To combine two numbers, click/tap on the first one, then the operation you want to do, then the second number.

If you make a mistake, the cancel button will let you start entering the operation again.

When you do this, your new number will appear in the second box you clicked. In addition, you'll also get a new number in place of the first number you clicked.

For example, to divide 100 by 5, you'd just need to click on 100, then /, then 5. The 20 you've created will appear where the 5 was, and a new number will replace the 100.

Each time you create a new number, you use up one of your remaining moves.

## Hitting a target

When you create the target number, you'll score a point, and be given a new target number. You'll also be given 3 bonus moves to help reach the new target!

## End of the game

The game ends when you run out of remaining moves. Your score is the number of targets you hit over the course of the game.