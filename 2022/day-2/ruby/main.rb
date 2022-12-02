# frozen_string_literal: true

file_data = File.read('../data.txt')

CODE = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS'
}.to_h

GUESS = {
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSORS'
}.to_h

scores = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
  WIN: 6,
  DRAW: 3,
  LOSE: 0
}.to_h

def draw?(theirs, mine)
  CODE[theirs] == GUESS[mine]
end

def win?(theirs, mine)
  case CODE[theirs]
  when 'ROCK'
    GUESS[mine] == 'PAPER'
  when 'PAPER'
    GUESS[mine] == 'SCISSORS'
  when 'SCISSORS'
    GUESS[mine] == 'ROCK'
  end
end

def lose?(theirs, mine)
  case CODE[theirs]
  when 'ROCK'
    GUESS[mine] == 'SCISSORS'
  when 'PAPER'
    GUESS[mine] == 'ROCK'
  when 'SCISSORS'
    GUESS[mine] == 'PAPER'
  end
end

score = 0

# Part 1
file_data.each_line do |line|
  theirs, mine = line.split(' ')

  my_choice_score = scores[GUESS[mine.to_sym].to_sym].to_i
  if draw?(theirs.to_sym, mine.to_sym)
    score += (scores[:DRAW] + my_choice_score)
  elsif win?(theirs.to_sym, mine.to_sym)
    score += (scores[:WIN] + my_choice_score)
  elsif lose?(theirs.to_sym, mine.to_sym)
    score += (scores[:LOSE] + my_choice_score)
  end
end

p score

# Part 2

REAL = {
  X: 'LOSE',
  Y: 'DRAW',
  Z: 'WIN'
}.to_h

WIN = {
  SCISSORS: 'ROCK',
  PAPER: 'SCISSORS',
  ROCK: 'PAPER'
}

LOSE = {
  ROCK: 'SCISSORS',
  PAPER: 'ROCK',
  SCISSORS: 'PAPER'
}

score = 0

# Part 1
file_data.each_line do |line|
  theirs, mine = line.split(' ')
  score += case REAL[mine.to_sym]
           when 'WIN'
             (scores[WIN[CODE[theirs.to_sym].to_sym].to_sym] + scores[REAL[mine.to_sym].to_sym])
           when 'LOSE'
             (scores[LOSE[CODE[theirs.to_sym].to_sym].to_sym] + scores[REAL[mine.to_sym].to_sym])
           else
             (scores[CODE[theirs.to_sym].to_sym] + scores[REAL[mine.to_sym].to_sym])
           end
end

p score
