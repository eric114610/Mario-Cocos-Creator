# Software Studio 2023 Spring Assignment 2

### Scoring

|**Basic Component**|**Score**|**Check**|
|:-:|:-:|:-:|
|Membership Mechanism|10%|Y|
|Complete Game Process|5%|Y|
|Basic Rules|45%|Y|
|Animations|10%|Y|
|Sound Effects|10%|Y|
|UI|10%|Y|

|**Advanced Component**|**Score**|**Check**|
|:-:|:-:|:-:|
|Leaderboard|5%|Y|
|Offline multi-player game|5%|N|
|Online multi-player game|15%|N|
|ice terrain (Others)|1-15%|Y|
|note block (Others)|1-15%|Y|
|jump platform (Others)|1-15%|Y|
|moving platform (Others)|1-15%|Y|
|pipe (Others)|1-15%|Y|
|collect special coin to unlock special room (Others)|1-15%|Y|
|special trigger to fall to secret room (Others)|1-15%|Y|

---

## Basic Components Description : 
### 1. World map
There are two maps, player has to first clear map 1 in order to play map2.
When game over(lifes == 0) player's score will be reset to 0, and also has to clear map1 again to unlock map2.

#### Win Flag

When Mario touches the flag, you clear this stage.

### 2. Player
#### Control
> Use left, right key to move left or right.
> Use up key to jump.

#### lifes
> When player touches the enemy or fall out of bound, player's life will -1.

>When life == 0, game is over, player's point will reset to 0 and life will reset to 5.

>When timer reaches 0, no matter how many lifes player has, game will be over, which means reset points and lifes.


### 3. Enemies
There are two kinds of enemies.

#### Goomba
![](https://hackmd.io/_uploads/HJp0JLlUn.png)

When mario step on its head, it will die.
Otherwise, if mario touches it, player will die.


#### Piranha Plant
![](https://hackmd.io/_uploads/BJBee8eLh.png)

Piranha Plant will emerge from the pipe and go back to it.
When Mario touches it, player will die.


### 4. Question Blocks
There are four kinds of question box.

#### Coin Question Blocks (Blue Coin)
![](https://hackmd.io/_uploads/BJyLZIg8n.png)
When Mario hits thi, points will plus 50.

![](https://hackmd.io/_uploads/SkD9bIlLh.png)
This only exists in stage2, when Maio hits this it will collect 1 blue coin.
Blue coin will be use to unlock a special room.


#### GreenMushroom Question Blocks
![](https://hackmd.io/_uploads/SJP4zLe8n.png)
When Mario hits this, it will pop out a greenmushroom, when Mario touches it, player's life will +1.


#### Goomba Question Blocks
![](https://hackmd.io/_uploads/rJyhWIxI3.png)
When Mario hits this, it will pop out a Goomba.

### 5. Animations

#### Walk
![](https://hackmd.io/_uploads/B1hg7Ix8h.png)

#### Jump
![](https://hackmd.io/_uploads/BkvGm8l8n.png)

#### Goomba Walk
![](https://hackmd.io/_uploads/H1JBQIxIn.png)
![](https://hackmd.io/_uploads/H1DIX8l82.png)

#### Goomba Die
![](https://hackmd.io/_uploads/ryF37LxIn.png)
![](https://hackmd.io/_uploads/S1mAQUgU2.png)

#### Piranha Plant
![](https://hackmd.io/_uploads/BkWZE8gIn.png)
![](https://hackmd.io/_uploads/HkGGVLgUn.png)


### 6. Sound effects
This game has bgm, mario jump and die sound effect.
Also has step on Goomba sound effect, Piranha Plant eats Mario sound effect, note blocks sound effect, coin sound effect, pipe sound effect, GreenMushroom appear sound effect, eat mushroom sound effect, and special trigger's sound effect.

### 7. UI
#### Player life
![](https://hackmd.io/_uploads/SyUgHIl8n.png)
Player's life will be immediately store to firebase when it changes.

> Maximum lifes is 10.

#### Timer
![](https://hackmd.io/_uploads/ByebrUeUh.png)


#### Points (Score)
![](https://hackmd.io/_uploads/SkrfH8lIn.png)
Player's points will be immediately store to firebase when it changes.
> Maximum point is 9999.


> **All of them can be read/write from firebase.**


### Membership Mechanism
#### LogIn
![](https://hackmd.io/_uploads/BkOFSIeLh.png)
Type in email and password to login.

#### SignUp
![](https://hackmd.io/_uploads/HJwMUUxLh.png)
Type in email and password and username to sign up.

>username is limit to <=6 characters

### Complete Game Process
#### Start Menu
![](https://hackmd.io/_uploads/SJtYILeU2.png)

#### Level Select
![](https://hackmd.io/_uploads/Hk_sILg82.png)

#### Game Start
![](https://hackmd.io/_uploads/Hyc3UUg83.png)
Mario will run from left to right.

#### Game Over
![](https://hackmd.io/_uploads/Skv-OUxUh.png)
Mario will fall from above.


## Advanced Component Description : 

### LeaderBoard
![](https://hackmd.io/_uploads/r1qHuLgLh.png)

Leader board will show the **current** highest point's player.
> when player is game over, its points will reset to 0. So if he is originally on top 5, it will no longer be top 5 because its point is 0 now.

> Maximun point is 9999.

### note block
![](https://hackmd.io/_uploads/r1CBKIxI2.png)
Step on it will play sound effect.
when still stand on it, it will replay the effect.

### ice terrain
![](https://hackmd.io/_uploads/r15tKIlUh.png)
When standing on ice, you can't jump.
Also, there will be a constant velocity to simulate 打滑

### jump platform
![](https://hackmd.io/_uploads/rkBWcIxIn.png)
When Mario is on jump platform, it can jump super high.

### moving platform
![](https://hackmd.io/_uploads/HJNq5Lx8n.png)


### pipe
![](https://hackmd.io/_uploads/SkwhcLeLn.png)

When Mario go into the pipe, it will be send to the other side of the pipe.

### collect special coin to unlock special room
In stage 2, there's a special coin you can collect.
![](https://hackmd.io/_uploads/Bk3T3DeU2.png)

When player collect all 5 of them, it will unlock a special room.
![](https://hackmd.io/_uploads/ry3xpPlL2.png)
> when coin<5, room is locked.

![](https://hackmd.io/_uploads/S1J_aDeUh.png)
> When coin==5, room will open.

There are 5 places to collect the coins.
1,2.
![](https://hackmd.io/_uploads/rkt0TwgUh.png)
There are 2 coins hide in these boxes.

3.
![](https://hackmd.io/_uploads/BybWCPxUh.png)
In this box.

4.
![](https://hackmd.io/_uploads/Hk47CPxL3.png)
At this platform.

5.
![](https://hackmd.io/_uploads/BJaNCDl8h.png)
At the table of respown point.
Player has to go back and forth for several times to get the coin.
![](https://hackmd.io/_uploads/ryZtAvlLn.png)


### special trigger to fall to secret room
There is a special trigger in stage 2.

Player have to lightly push this wood to make it fall into the gap.
![](https://hackmd.io/_uploads/HykEJOl8h.png)

![](https://hackmd.io/_uploads/HJmI1_l82.png)

Then player has to stand on it to trigger it.
![](https://hackmd.io/_uploads/Sybi1deLn.png)


After a while the platform will fall, and Mario will fall to a secret room.
![](https://hackmd.io/_uploads/rJciJOeI2.png)

![](https://hackmd.io/_uploads/rJ4qy_xL3.png)
Where you can easily clear this stage.


# Firebase page link
https://assignment2-4204d.web.app
