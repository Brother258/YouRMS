import pandas as pd

try:
    df = pd.read_excel("Class Schedule For Spring 2026 (UG) 27-11-25.xlsx", header=None)
    print(df.head(20).to_string())
except Exception as e:
    print(e)
