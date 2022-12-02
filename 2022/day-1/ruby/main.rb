# frozen_string_literal: true

file = File.read('../data.txt')

groups = []
file.split("\n\n").each do |group|
  grp_total = group.split("\n").map(&:to_i).sum
  groups << grp_total
end

# Part 1
p groups.max

# Part 2
groups.sort!.reverse!
p groups[0..2].sum
