import re
import csv

RACE_NAME = "Milano-Sanremo"

def parse_results(lines):
    results = []
    i = 0
    while i < len(lines):
        text = lines[i].lstrip()
        m = re.match(r'^(?P<pos>\d+|DNF|DNS)\b', text)
        if m:
            pos = m.group('pos')
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            if j >= len(lines): break
            name = lines[j].strip()
            k = j + 1
            while k < len(lines) and not lines[k].strip():
                k += 1
            if k >= len(lines): break
            team = lines[k].split('\t')[0].strip()
            results.append((pos, name, team))
            i = k + 1
        else:
            i += 1
    return results

def main():
    
    with open('results.txt', encoding='utf-8') as f:
        lines = f.readlines()
    rows = parse_results(lines)
    out = 'entries.csv'
    with open(out, 'a', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        for pos, name, team in rows:
            w.writerow([RACE_NAME, pos, name, team])
    print(f"Added {len(rows)} rows to {out}")

if __name__ == '__main__':
    main()
