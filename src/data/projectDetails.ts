export interface QuizQuestion {
  id: number;
  type: "choice" | "truefalse" | "fill";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface PracticeCode {
  starterCode: string;
  referenceCode: string;
  feedback: string;
}

export interface KnowledgePoint {
  title: string;
  content: string;
  codeExample?: string;
  quiz: {
    question: string;
    options?: string[];
    answer: string | number;
    explanation: string;
  }[];
}

export interface ProjectDetail {
  learning: KnowledgePoint[];
  practice: PracticeCode;
  test: QuizQuestion[];
}

export const projectDetails: Record<number, ProjectDetail> = {
  1: {
    learning: [
      {
        title: "缺失值处理",
        content: "在实际数据中，缺失值是常见的问题。Pandas提供了多种检测和处理缺失值的方法。",
        codeExample: `import pandas as pd
import numpy as np

# 创建包含缺失值的数据
df = pd.DataFrame({
    '产品': ['A', 'B', 'C', 'D'],
    '销量': [100, np.nan, 300, np.nan],
    '价格': [10, 20, np.nan, 40]
})

# 检测缺失值
print(df.isnull())
print(df.isnull().sum())

# 删除缺失值
df_clean = df.dropna()

# 填充缺失值
df_filled = df.fillna(df.mean())`,
        quiz: [
          {
            question: "以下哪个方法可以检测DataFrame中的缺失值？",
            options: ["df.isna()", "df.checknull()", "df.findNaN()", "df.missing()"],
            answer: "A",
            explanation: "isna() 和 isnull() 都可以用来检测缺失值，它们是等价的。"
          },
          {
            question: "dropna()方法默认会删除包含任意缺失值的行。",
            options: ["正确", "错误"],
            answer: "正确",
            explanation: "默认情况下，dropna()会删除任何含有缺失值的行。如果只想删除全部为缺失值的行，需要设置how='all'。"
          }
        ]
      },
      {
        title: "重复值处理",
        content: "重复数据会影响分析结果的准确性，需要及时识别和处理。",
        codeExample: `import pandas as pd

df = pd.DataFrame({
    '订单号': ['001', '002', '001', '003', '002'],
    '产品': ['A', 'B', 'A', 'C', 'B'],
    '数量': [10, 20, 10, 30, 20]
})

# 检测重复值
print(df.duplicated())

# 删除重复值
df_unique = df.drop_duplicates()

# 基于特定列删除重复值
df_unique2 = df.drop_duplicates(subset=['订单号'])`,
        quiz: [
          {
            question: "duplicated()方法返回的是哪种类型的数据？",
            options: ["DataFrame", "Series", "list", "boolean值"],
            answer: "B",
            explanation: "duplicated()返回一个Boolean Series，标记每行是否为重复行。"
          }
        ]
      },
      {
        title: "数据类型转换",
        content: "确保数据类型正确是数据分析的基础，错误的数据类型会导致计算错误。",
        codeExample: `import pandas as pd

# 创建数据
df = pd.DataFrame({
    '日期': ['2024-01-01', '2024-01-02', '2024-01-03'],
    '销量': ['100', '200', '300'],  # 字符串类型
    '价格': ['10.5', '20.3', '15.8']  # 字符串类型
})

# 转换为数值类型
df['销量'] = df['销量'].astype(int)
df['价格'] = df['价格'].astype(float)

# 转换为日期类型
df['日期'] = pd.to_datetime(df['日期'])

# 查看数据类型
print(df.dtypes)`,
        quiz: [
          {
            question: "将字符串'123'转换为整数应该使用哪个方法？",
            options: ["'123'.to_int()", "int('123')", "String.to_int('123')", "'123'.convert(int)"],
            answer: "B",
            explanation: "Python内置的int()函数可以将字符串转换为整数。也可以使用pd.to_numeric()。"
          }
        ]
      }
    ],
    practice: {
      starterCode: `import pandas as pd
import numpy as np

# 读取数据
df = pd.read_csv('retail_orders.csv')

# TODO 1: 检测数据中的缺失值数量
missing_count = # 请补充代码

# TODO 2: 删除重复行
df_no_duplicates = # 请补充代码

# TODO 3: 将订单日期列转换为日期类型
df['订单日期'] = # 请补充代码

# TODO 4: 用0填充缺失的销量数据
df['销量'] = # 请补充代码

print("处理后的数据：")
print(df.head())`,
      referenceCode: `import pandas as pd
import numpy as np

# 读取数据
df = pd.read_csv('retail_orders.csv')

# TODO 1: 检测数据中的缺失值数量
missing_count = df.isnull().sum()
print(f"缺失值统计：\\n{missing_count}")

# TODO 2: 删除重复行
df_no_duplicates = df.drop_duplicates()

# TODO 3: 将订单日期列转换为日期类型
df['订单日期'] = pd.to_datetime(df['订单日期'])

# TODO 4: 用0填充缺失的销量数据
df['销量'] = df['销量'].fillna(0)

print("处理后的数据：")
print(df.head())`,
      feedback: "你的代码思路正确。注意：缺失值处理有多种方式，需要根据业务场景选择合适的方法。删除重复行使用drop_duplicates()，日期转换使用pd.to_datetime()。"
    },
    test: [
      {
        id: 1,
        type: "choice",
        question: "哪个方法可以统计每列缺失值的数量？",
        options: ["df.count()", "df.isnull().sum()", "df.na().count()", "df.missing()"],
        correctAnswer: 1,
        explanation: "isnull().sum() 会统计每列中缺失值的数量，是最常用的缺失值检测方法。"
      },
      {
        id: 2,
        type: "truefalse",
        question: "dropna()默认会删除所有包含缺失值的行",
        correctAnswer: "正确",
        explanation: "默认情况下，dropna()的how参数为'any'，会删除任何包含至少一个缺失值的行。"
      },
      {
        id: 3,
        type: "choice",
        question: "将字符串'45.6'转换为浮点数，正确的方法是？",
        options: ["float('45.6')", "'45.6'.to_float()", "String('45.6').float()", "parseFloat('45.6')"],
        correctAnswer: 0,
        explanation: "Python内置的float()函数可以将字符串转换为浮点数，也可以使用pd.to_numeric()。"
      },
      {
        id: 4,
        type: "fill",
        question: "fillna()方法的默认填充值是？",
        correctAnswer: "None",
        explanation: "fillna()默认不指定值时，填充值为None（实际上不会改变缺失值）。需要通过value参数指定填充值。"
      }
    ]
  },
  2: {
    learning: [
      {
        title: "数据筛选",
        content: "根据条件筛选数据是数据分析中最常用的操作之一。",
        codeExample: `import pandas as pd

df = pd.DataFrame({
    '电影': ['肖申克的救赎', '霸王别姬', '阿甘正传', '泰坦尼克号'],
    '评分': [9.7, 9.6, 9.5, 9.4],
    '年份': [1994, 1993, 1994, 1997],
    '类型': ['剧情', '剧情', '剧情', '爱情']
})

# 单一条件筛选
high_rated = df[df['评分'] > 9.5]

# 多条件筛选
classic_movies = df[(df['年份'] == 1994) & (df['评分'] > 9.4)]

# 使用query方法
result = df.query('评分 > 9.5 and 类型 == "剧情"')`,
        quiz: [
          {
            question: "筛选评分大于9.5的电影，正确的代码是？",
            options: ["df[df.评分 > 9.5]", "df.select(评分 > 9.5)", "df.filter(评分 > 9.5)", "df.where(评分 > 9.5)"],
            answer: "A",
            explanation: "使用布尔索引 df[条件] 是筛选数据最常用的方式。"
          }
        ]
      },
      {
        title: "数据排序",
        content: "对数据进行排序可以更好地理解数据分布和优先级。",
        codeExample: `import pandas as pd

df = pd.DataFrame({
    '产品': ['A', 'B', 'C', 'D'],
    '销量': [300, 150, 400, 200],
    '评分': [4.5, 4.8, 4.2, 4.6]
})

# 按单列升序排序
df_sorted = df.sort_values('销量')

# 按单列降序排序
df_sorted_desc = df.sort_values('销量', ascending=False)

# 按多列排序
df_multi = df.sort_values(['评分', '销量'], ascending=[False, True])`,
        quiz: [
          {
            question: "sort_values()默认的排序方式是？",
            options: ["降序", "升序", "随机", "按索引"],
            answer: "B",
            explanation: "sort_values()默认ascending=True，即升序排列。"
          }
        ]
      },
      {
        title: "分组统计",
        content: "分组统计可以按类别汇总数据，是数据分析的核心技能。",
        codeExample: `import pandas as pd

df = pd.DataFrame({
    '类别': ['电子产品', '服装', '电子产品', '食品', '服装'],
    '产品': ['手机', 'T恤', '电脑', '面包', '裤子'],
    '销售额': [5000, 200, 8000, 50, 300]
})

# 单列分组统计
category_sales = df.groupby('类别')['销售额'].sum()

# 多指标统计
summary = df.groupby('类别').agg({
    '销售额': ['sum', 'mean', 'count']
})`,
        quiz: [
          {
            question: "groupby('类别')['销售额'].sum() 的作用是？",
            options: ["计算销售额的平均值", "按类别分组求销售额总和", "统计每个类别的产品数量", "查找销售额最大值"],
            answer: "B",
            explanation: "groupby('类别')['销售额'].sum() 表示按类别分组，然后对每组的销售额求和。"
          }
        ]
      }
    ],
    practice: {
      starterCode: `import pandas as pd

df = pd.DataFrame({
    '电影': ['肖申克的救赎', '霸王别姬', '阿甘正传', '盗梦空间', '星际穿越'],
    '评分': [9.7, 9.6, 9.5, 9.3, 9.4],
    '年份': [1994, 1993, 1994, 2010, 2014],
    '类型': ['剧情', '剧情', '剧情', '科幻', '科幻']
})

# TODO 1: 筛选评分大于9.4的电影
high_rated = # 请补充代码

# TODO 2: 按评分降序排列
sorted_movies = # 请补充代码

# TODO 3: 按类型分组，计算每组的平均评分
type_avg = # 请补充代码

print("高分电影：")
print(high_rated)
print("\\n排序后的电影：")
print(sorted_movies)
print("\\n类型平均评分：")
print(type_avg)`,
      referenceCode: `import pandas as pd

df = pd.DataFrame({
    '电影': ['肖申克的救赎', '霸王别姬', '阿甘正传', '盗梦空间', '星际穿越'],
    '评分': [9.7, 9.6, 9.5, 9.3, 9.4],
    '年份': [1994, 1993, 1994, 2010, 2014],
    '类型': ['剧情', '剧情', '剧情', '科幻', '科幻']
})

# TODO 1: 筛选评分大于9.4的电影
high_rated = df[df['评分'] > 9.4]

# TODO 2: 按评分降序排列
sorted_movies = df.sort_values('评分', ascending=False)

# TODO 3: 按类型分组，计算每组的平均评分
type_avg = df.groupby('类型')['评分'].mean()

print("高分电影：")
print(high_rated)
print("\\n排序后的电影：")
print(sorted_movies)
print("\\n类型平均评分：")
print(type_avg)`,
      feedback: "数据筛选使用了布尔索引，排序使用了sort_values()方法，分组统计使用了groupby()。注意多条件筛选时需要用&运算符并加括号。"
    },
    test: [
      {
        id: 1,
        type: "choice",
        question: "筛选年份为1994年的电影，正确代码是？",
        options: ["df[df.年份 = 1994]", "df[df.年份 == 1994]", "df.select(年份:1994)", "df.filter(1994)"],
        correctAnswer: 1,
        explanation: "筛选条件需要使用 == 进行比较运算，而不是 =（赋值）。"
      },
      {
        id: 2,
        type: "truefalse",
        question: "sort_values('评分', ascending=False) 表示按评分升序排列",
        correctAnswer: "错误",
        explanation: "ascending=False 表示降序排列，ascending=True（默认）表示升序排列。"
      },
      {
        id: 3,
        type: "fill",
        question: "按'类别'分组计算'销售额'的平均值，代码是 df.groupby('类别')['销售额'].___(__)",
        correctAnswer: "mean()",
        explanation: "groupby后直接跟聚合函数，如sum()、mean()、count()等。"
      }
    ]
  },
  3: {
    learning: [
      {
        title: "字符串处理",
        content: "Pandas提供了强大的字符串处理能力，可以对文本数据进行清洗和转换。",
        codeExample: `import pandas as pd

df = pd.DataFrame({
    '姓名': ['  张三  ', '李四', '王 五'],
    '邮箱': ['zhangsan@email.com', 'lisi@email.com', 'wangwu@email.com'],
    '电话': ['138-0000-1234', '139-0000-5678', '137-0000-9012']
})

# 去除空格
df['姓名'] = df['姓名'].str.strip()

# 字符串替换
df['电话'] = df['电话'].str.replace('-', '')

# 提取子字符串
df['姓名长度'] = df['姓名'].str.len()

# 大小写转换
df['邮箱'] = df['邮箱'].str.lower()`,
        quiz: [
          {
            question: "去除字符串两端空格的正确方法是？",
            options: ["str.trim()", "str.strip()", "str.remove()", "str.clean()"],
            answer: "B",
            explanation: "strip()方法去除字符串两端的空格，lstrip()去左，rstrip()去右。"
          }
        ]
      },
      {
        title: "时间日期转换",
        content: "将字符串转换为日期时间类型是时间序列分析的基础。",
        codeExample: `import pandas as pd

# 字符串转日期
df = pd.DataFrame({
    '日期': ['2024-01-01', '2024-01-02', '2024-01-03']
})
df['日期'] = pd.to_datetime(df['日期'])

# 提取年月日
df['年'] = df['日期'].dt.year
df['月'] = df['日期'].dt.month
df['日'] = df['日期'].dt.day
df['星期'] = df['日期'].dt.dayofweek

# 日期计算
df['加一天'] = df['日期'] + pd.Timedelta(days=1)`,
        quiz: [
          {
            question: "将字符串'2024-01-15'转换为日期类型，应该使用？",
            options: ["Date('2024-01-15')", "pd.to_datetime('2024-01-15')", "datetime.strptime('2024-01-15')", "以上都可以"],
            answer: "D",
            explanation: "三种方法都可以将字符串转换为日期类型，pd.to_datetime()最常用且支持多种格式。"
          }
        ]
      }
    ],
    practice: {
      starterCode: `import pandas as pd

df = pd.DataFrame({
    '用户': ['  user_001  ', 'user_002', '  user_003'],
    '登录时间': ['2024-01-01 10:30:00', '2024-01-02 14:20:00', '2024-01-03 09:15:00'],
    '操作': ['login', 'LOGOUT', 'login']
})

# TODO 1: 去除用户名的空格并转换为小写
df['用户'] = # 请补充代码

# TODO 2: 将登录时间转换为日期时间类型
df['登录时间'] = # 请补充代码

# TODO 3: 提取登录月份
df['月份'] = # 请补充代码

# TODO 4: 将操作类型统一转为小写
df['操作'] = # 请补充代码

print(df)`,
      referenceCode: `import pandas as pd

df = pd.DataFrame({
    '用户': ['  user_001  ', 'user_002', '  user_003'],
    '登录时间': ['2024-01-01 10:30:00', '2024-01-02 14:20:00', '2024-01-03 09:15:00'],
    '操作': ['login', 'LOGOUT', 'login']
})

# TODO 1: 去除用户名的空格并转换为小写
df['用户'] = df['用户'].str.strip().str.lower()

# TODO 2: 将登录时间转换为日期时间类型
df['登录时间'] = pd.to_datetime(df['登录时间'])

# TODO 3: 提取登录月份
df['月份'] = df['登录时间'].dt.month

# TODO 4: 将操作类型统一转为小写
df['操作'] = df['操作'].str.lower()

print(df)`,
      feedback: "字符串处理使用str.strip()去空格，str.lower()转小写。日期转换使用pd.to_datetime()，提取月份使用dt.month。"
    },
    test: [
      {
        id: 1,
        type: "choice",
        question: "哪个方法可以将字符串转为小写？",
        options: ["str.upper()", "str.lower()", "str.capitalize()", "str.title()"],
        correctAnswer: 1,
        explanation: "lower()转小写，upper()转大写，capitalize()首字母大写，title()每个单词首字母大写。"
      },
      {
        id: 2,
        type: "fill",
        question: "从日期列提取年份，应该使用 .___(1) 属性",
        correctAnswer: "dt.year",
        explanation: "对于datetime类型，使用dt.year提取年份，dt.month提取月份，dt.day提取日期。"
      },
      {
        id: 3,
        type: "truefalse",
        question: "pd.to_datetime()只能处理'YYYY-MM-DD'格式的日期字符串",
        correctAnswer: "错误",
        explanation: "pd.to_datetime()非常灵活，可以处理多种日期格式，如'2024-01-15'、'01/15/2024'、'Jan 15, 2024'等。"
      }
    ]
  },
  4: {
    learning: [
      {
        title: "数据透视表",
        content: "数据透视表是数据分析中强大的汇总工具，可以快速按照多个维度分析数据。",
        codeExample: `import pandas as pd

df = pd.DataFrame({
    '日期': ['2024-01', '2024-01', '2024-02', '2024-02'],
    '地区': ['华北', '华南', '华北', '华南'],
    '产品': ['手机', '电脑', '手机', '电脑'],
    '销售额': [10000, 20000, 12000, 22000]
})

# 创建透视表
pivot = pd.pivot_table(
    df,
    values='销售额',
    index='地区',
    columns='产品',
    aggfunc='sum',
    fill_value=0
)

# 多指标透视表
pivot_multi = pd.pivot_table(
    df,
    values='销售额',
    index='地区',
    columns='日期',
    aggfunc=['sum', 'mean']
)`,
        quiz: [
          {
            question: "透视表中，index参数的作用是？",
            options: ["指定要汇总的数值列", "指定行索引（行维度）", "指定列索引（列维度）", "指定聚合函数"],
            answer: "B",
            explanation: "index参数指定透视表的行索引（行维度），columns指定列维度，values指定要汇总的数值列。"
          }
        ]
      },
      {
        title: "分组聚合",
        content: "分组聚合是数据汇总的核心操作，配合aggfunc可以实现多种统计。",
        codeExample: `import pandas as pd

df = pd.DataFrame({
    '部门': ['销售', '技术', '销售', '技术', '销售'],
    '员工': ['A', 'B', 'C', 'D', 'E'],
    '薪资': [8000, 12000, 9000, 13000, 8500],
    '年龄': [25, 30, 28, 35, 26]
})

# 单列单指标聚合
result = df.groupby('部门')['薪资'].sum()

# 多指标聚合
result_multi = df.groupby('部门').agg({
    '薪资': ['sum', 'mean', 'max'],
    '年龄': ['min', 'max']
})`,
        quiz: [
          {
            question: "aggfunc='mean' 表示计算什么？",
            options: ["总和", "平均值", "计数", "最大值"],
            answer: "B",
            explanation: "aggfunc指定聚合函数，'mean'计算平均值，还可以是'sum'、'count'、'max'、'min'等。"
          }
        ]
      }
    ],
    practice: {
      starterCode: `import pandas as pd

df = pd.DataFrame({
    '季度': ['Q1', 'Q1', 'Q2', 'Q2', 'Q1', 'Q2'],
    '地区': ['北京', '上海', '北京', '上海', '北京', '上海'],
    '产品': ['手机', '手机', '电脑', '电脑', '电脑', '手机'],
    '销售额': [10000, 15000, 20000, 18000, 12000, 16000],
    '利润': [2000, 3000, 4000, 3500, 2500, 3200]
})

# TODO 1: 创建透视表，按地区和季度查看销售额
sales_pivot = # 请补充代码

# TODO 2: 按产品分组，计算销售额和利润的总和
product_summary = # 请补充代码

# TODO 3: 按地区分组，计算平均利润率（利润/销售额）
df['利润率'] = df['利润'] / df['销售额']
profit_rate = # 请补充代码

print("销售额透视表：")
print(sales_pivot)
print("\\n产品汇总：")
print(product_summary)
print("\\n地区平均利润率：")
print(profit_rate)`,
      referenceCode: `import pandas as pd

df = pd.DataFrame({
    '季度': ['Q1', 'Q1', 'Q2', 'Q2', 'Q1', 'Q2'],
    '地区': ['北京', '上海', '北京', '上海', '北京', '上海'],
    '产品': ['手机', '手机', '电脑', '电脑', '电脑', '手机'],
    '销售额': [10000, 15000, 20000, 18000, 12000, 16000],
    '利润': [2000, 3000, 4000, 3500, 2500, 3200]
})

# TODO 1: 创建透视表，按地区和季度查看销售额
sales_pivot = pd.pivot_table(df, values='销售额', index='地区', columns='季度', aggfunc='sum', fill_value=0)

# TODO 2: 按产品分组，计算销售额和利润的总和
product_summary = df.groupby('产品')[['销售额', '利润']].sum()

# TODO 3: 按地区分组，计算平均利润率（利润/销售额）
df['利润率'] = df['利润'] / df['销售额']
profit_rate = df.groupby('地区')['利润率'].mean()

print("销售额透视表：")
print(sales_pivot)
print("\\n产品汇总：")
print(product_summary)
print("\\n地区平均利润率：")
print(profit_rate)`,
      feedback: "透视表使用pd.pivot_table()创建，注意index（行维度）、columns（列维度）、values（数值列）、aggfunc（聚合函数）的配合使用。"
    },
    test: [
      {
        id: 1,
        type: "choice",
        question: "创建透视表时，fill_value=0的作用是？",
        options: ["填充数值列的0值", "填充缺失值为0", "指定聚合函数", "指定索引名称"],
        correctAnswer: 1,
        explanation: "fill_value用于将透视表中的缺失值填充为指定的值，设为0表示用0填充缺失值。"
      },
      {
        id: 2,
        type: "truefalse",
        question: "groupby().agg()可以对不同的列使用不同的聚合函数",
        correctAnswer: "正确",
        explanation: "agg()接收字典可以指定不同列的不同聚合函数，如agg({'销售额': 'sum', '利润': 'mean'})。"
      },
      {
        id: 3,
        type: "fill",
        question: "透视表的四个核心参数是：index、columns、values 和 ___",
        correctAnswer: "aggfunc",
        explanation: "透视表核心参数是index(行索引)、columns(列索引)、values(数值)、aggfunc(聚合函数)。"
      }
    ]
  },
  5: {
    learning: [
      {
        title: "特征工程",
        content: "特征工程是机器学习中的关键步骤，通过处理原始数据来创建对模型更有意义的特征。",
        codeExample: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    '收入': [5000, 8000, 3000, 12000, 6000],
    '年龄': [25, 35, 22, 45, 30],
    '消费': [3000, 5000, 2000, 8000, 4000]
})

# 创建新特征
df['收入消费比'] = df['收入'] / df['消费']
df['收入年龄比'] = df['收入'] / df['年龄']

# 特征标准化
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
df标准化 = pd.DataFrame(
    scaler.fit_transform(df),
    columns=df.columns
)`,
        quiz: [
          {
            question: "特征工程的主要目的是？",
            options: ["删除数据", "增加数据量", "创建对模型更有意义的特征", "加密数据"],
            answer: "C",
            explanation: "特征工程通过创建、转换、选择特征来提高模型的性能，是机器学习成功的关键。"
          }
        ]
      },
      {
        title: "相关性分析",
        content: "相关性分析帮助我们理解变量之间的关系，是特征选择的重要依据。",
        codeExample: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    '工龄': [1, 3, 5, 7, 10],
    '培训次数': [2, 3, 4, 5, 6],
    '绩效评分': [60, 70, 80, 85, 95],
    '流失': [1, 0, 0, 0, 0]
})

# 计算相关系数矩阵
corr_matrix = df.corr()

# 查看与目标变量的相关性
print(corr_matrix['流失'].sort_values(ascending=False))

# 绘制热力图
import matplotlib.pyplot as plt
plt.figure(figsize=(10, 8))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm')
plt.title('Correlation Heatmap')`,
        quiz: [
          {
            question: "相关系数的取值范围是？",
            options: ["0到1", "-1到1", "-1到0", "任意数值"],
            answer: "B",
            explanation: "相关系数取值范围是[-1, 1]，1表示完全正相关，-1表示完全负相关，0表示无相关性。"
          }
        ]
      }
    ],
    practice: {
      starterCode: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    '客户ID': [1, 2, 3, 4, 5],
    '月消费': [500, 800, 300, 1200, 600],
    '月登录次数': [10, 20, 5, 30, 15],
    '客服投诉': [2, 0, 5, 0, 1],
    '流失': [1, 0, 1, 0, 0]
})

# TODO 1: 创建消费登录比特征
df['消费登录比'] = # 请补充代码

# TODO 2: 计算与流失的相关性
correlations = # 请补充代码

# TODO 3: 判断哪些特征与流失正相关
positive_corr = correlations[correlations > 0]

print("相关系数：")
print(correlations.sort_values(ascending=False))
print("\\n正相关的特征：")
print(positive_corr)`,
      referenceCode: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    '客户ID': [1, 2, 3, 4, 5],
    '月消费': [500, 800, 300, 1200, 600],
    '月登录次数': [10, 20, 5, 30, 15],
    '客服投诉': [2, 0, 5, 0, 1],
    '流失': [1, 0, 1, 0, 0]
})

# TODO 1: 创建消费登录比特征
df['消费登录比'] = df['月消费'] / df['月登录次数']

# TODO 2: 计算与流失的相关性
correlations = df.corr()['流失'].drop('流失')

# TODO 3: 判断哪些特征与流失正相关
positive_corr = correlations[correlations > 0]

print("相关系数：")
print(correlations.sort_values(ascending=False))
print("\\n正相关的特征：")
print(positive_corr)`,
      feedback: "特征工程创建新特征，相关系数使用corr()方法计算。注意drop('流失')是为了排除自身相关性。"
    },
    test: [
      {
        id: 1,
        type: "choice",
        question: "相关系数为0.8表示什么？",
        options: ["强负相关", "无相关", "弱正相关", "强正相关"],
        correctAnswer: "D",
        explanation: "相关系数绝对值越大表示相关性越强，0.8接近1表示强正相关。"
      },
      {
        id: 2,
        type: "truefalse",
        question: "特征工程只能在机器学习模型训练之前进行",
        correctAnswer: "错误",
        explanation: "特征工程可以在数据分析的任何阶段进行，既可以在建模前，也可以在建模后根据模型表现进行优化。"
      },
      {
        id: 3,
        type: "fill",
        question: "计算DataFrame所有列之间的相关系数，使用 ___() 方法",
        correctAnswer: "corr",
        explanation: "df.corr()计算所有数值列之间的相关系数矩阵。"
      }
    ]
  },
  6: {
    learning: [
      {
        title: "库存周转率计算",
        content: "库存周转率是衡量库存管理水平的重要指标，反映了库存周转的速度。",
        codeExample: `import pandas as pd

df = pd.DataFrame({
    '产品': ['A', 'B', 'C', 'D'],
    '期初库存': [100, 200, 150, 80],
    '期末库存': [80, 180, 120, 100],
    '销售成本': [5000, 8000, 6000, 4000],
    '销售单价': [50, 40, 50, 50]
})

# 计算平均库存
df['平均库存'] = (df['期初库存'] + df['期末库存']) / 2

# 计算库存周转率（次数）
df['周转率'] = df['销售成本'] / df['平均库存']

# 计算库存周转天数
df['周转天数'] = 365 / df['周转率']

print(df[['产品', '周转率', '周转天数']])`,
        quiz: [
          {
            question: "库存周转率越高说明什么？",
            options: ["库存积压严重", "库存周转越快", "库存价值越高", "库存越多"],
            answer: "B",
            explanation: "库存周转率越高表示库存周转越快，资金利用效率越高。"
          }
        ]
      },
      {
        title: "呆滞料分析",
        content: "呆滞料是指长期积压不流动的物料，需要及时识别和处理。",
        codeExample: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    '物料': ['M001', 'M002', 'M003', 'M004'],
    '库存数量': [100, 50, 200, 10],
    '最后出库日期': ['2024-01-01', '2024-03-15', '2024-06-01', '2024-06-20'],
    '单价': [10, 20, 15, 100]
})

df['最后出库日期'] = pd.to_datetime(df['最后出库日期'])
reference_date = pd.to_datetime('2024-06-30')

# 计算未出库天数
df['未出库天数'] = (reference_date - df['最后出库日期']).dt.days

# 识别呆滞料（超过90天未出库）
df['呆滞料'] = df['未出库天数'] > 90

# 计算呆滞金额
df['呆滞金额'] = df['库存数量'] * df['单价'] * df['呆滞料'].astype(int)`,
        quiz: [
          {
            question: "呆滞料分析的主要目的是？",
            options: ["增加库存", "识别积压物料，减少资金占用", "提高销售", "减少采购"],
            answer: "B",
            explanation: "呆滞料分析帮助企业及时发现积压物料，加速资金周转。"
          }
        ]
      }
    ],
    practice: {
      starterCode: `import pandas as pd

df = pd.DataFrame({
    '产品': ['P1', 'P2', 'P3', 'P4', 'P5'],
    '期初库存': [100, 200, 150, 80, 120],
    '期末库存': [80, 180, 120, 100, 100],
    '销售成本': [5000, 8000, 6000, 4000, 7000],
    '单价': [50, 40, 50, 50, 45]
})

# TODO 1: 计算平均库存
df['平均库存'] = # 请补充代码

# TODO 2: 计算周转率
df['周转率'] = # 请补充代码

# TODO 3: 标记低周转产品（周转率<5）
df['低周转'] = # 请补充代码

# TODO 4: 计算滞销金额（低周转产品的库存*单价之和）
slow_selling_amount = # 请补充代码

print(df)
print(f"\\n滞销金额: {slow_selling_amount}")`,
      referenceCode: `import pandas as pd

df = pd.DataFrame({
    '产品': ['P1', 'P2', 'P3', 'P4', 'P5'],
    '期初库存': [100, 200, 150, 80, 120],
    '期末库存': [80, 180, 120, 100, 100],
    '销售成本': [5000, 8000, 6000, 4000, 7000],
    '单价': [50, 40, 50, 50, 45]
})

# TODO 1: 计算平均库存
df['平均库存'] = (df['期初库存'] + df['期末库存']) / 2

# TODO 2: 计算周转率
df['周转率'] = df['销售成本'] / df['平均库存']

# TODO 3: 标记低周转产品（周转率<5）
df['低周转'] = df['周转率'] < 5

# TODO 4: 计算滞销金额（低周转产品的库存*单价之和）
slow_selling_amount = (df[df['低周转']]['平均库存'] * df[df['低周转']]['单价']).sum()

print(df)
print(f"\\n滞销金额: {slow_selling_amount}")`,
      feedback: "库存周转率 = 销售成本 / 平均库存。注意布尔索引筛选和求和的配合使用。"
    },
    test: [
      {
        id: 1,
        type: "choice",
        question: "库存周转率的计算公式是？",
        options: ["库存数量/销售数量", "销售成本/平均库存", "销售额/库存金额", "利润/库存成本"],
        correctAnswer: 1,
        explanation: "库存周转率 = 销售成本 ÷ 平均库存，反映库存周转的速度。"
      },
      {
        id: 2,
        type: "truefalse",
        question: "周转天数 = 365 / 周转率",
        correctAnswer: "正确",
        explanation: "周转天数表示库存周转一次需要的天数，计算公式是365 ÷ 周转率。"
      },
      {
        id: 3,
        type: "fill",
        question: "平均库存的计算公式是 (期初库存 + 期末库存) / ___",
        correctAnswer: "2",
        explanation: "平均库存是期初和期末库存的算术平均值。"
      }
    ]
  },
  7: {
    learning: [
      {
        title: "关联规则基础",
        content: "关联规则挖掘用于发现数据集中的有趣关联，最经典的案例是购物篮分析。",
        codeExample: `# 频繁项集示例
from mlxtend.frequent_patterns import apriori
from mlxtend.preprocessing import TransactionEncoder

transactions = [
    ['牛奶', '面包', '尿布'],
    ['可乐', '面包', '尿布', '啤酒'],
    ['牛奶', '尿布', '啤酒'],
    ['面包', '牛奶', '尿布', '啤酒'],
    ['可乐', '面包', '尿布']
]

# 转换为one-hot编码
te = TransactionEncoder()
te_ary = te.fit(transactions).transform(transactions)
df = pd.DataFrame(te_ary, columns=te.columns_)

# 使用Apriori算法找频繁项集
frequent_itemsets = apriori(df, min_support=0.6, use_colnames=True)`,
        quiz: [
          {
            question: "关联规则中，'支持度'表示什么？",
            options: ["规则成立的次数", "规则成立占总交易的比例", "规则的置信度", "规则的有趣程度"],
            answer: "B",
            explanation: "支持度 = 包含项集的交易数 / 总交易数，表示项集出现的频率。"
          }
        ]
      },
      {
        title: "置信度与提升度",
        content: "置信度和提升度是评估关联规则质量的重要指标。",
        codeExample: `# 计算关联规则
from mlxtend.frequent_patterns import association_rules

rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.7)

# 关键指标解释
# support: 支持度 - 项集出现的频率
# confidence: 置信度 - P(B|A)，包含A的交易中同时包含B的比例
# lift: 提升度 - P(A,B)/(P(A)*P(B))，大于1表示正相关

print(rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']])`,
        quiz: [
          {
            question: "提升度(lift)大于1表示什么？",
            options: ["负相关", "无相关", "正相关", "完全相关"],
            answer: "C",
            explanation: "lift > 1表示正相关，lift < 1表示负相关，lift = 1表示无相关。"
          }
        ]
      }
    ],
    practice: {
      starterCode: `from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder
import pandas as pd

# 模拟交易数据
transactions = [
    ['牛奶', '面包'],
    ['面包', '尿布', '啤酒'],
    ['牛奶', '尿布', '啤酒'],
    ['面包', '牛奶'],
    ['尿布', '啤酒'],
]

# TODO 1: 使用TransactionEncoder转换为one-hot编码
te = TransactionEncoder()
te_ary = # 请补充代码
df = pd.DataFrame(te_ary, columns=te.columns_)

# TODO 2: 使用Apriori算法找出支持度>=0.4的频繁项集
frequent_itemsets = # 请补充代码

# TODO 3: 计算置信度>=0.6的关联规则
rules = # 请补充代码

# TODO 4: 筛选提升度>1的规则
strong_rules = # 请补充代码

print("频繁项集：")
print(frequent_itemsets)
print("\\n强关联规则：")
print(strong_rules)`,
      referenceCode: `from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder
import pandas as pd

transactions = [
    ['牛奶', '面包'],
    ['面包', '尿布', '啤酒'],
    ['牛奶', '尿布', '啤酒'],
    ['面包', '牛奶'],
    ['尿布', '啤酒'],
]

te = TransactionEncoder()
te_ary = te.fit(transactions).transform(transactions)
df = pd.DataFrame(te_ary, columns=te.columns_)

frequent_itemsets = apriori(df, min_support=0.4, use_colnames=True)

rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.6)

strong_rules = rules[rules['lift'] > 1]

print("频繁项集：")
print(frequent_itemsets)
print("\\n强关联规则：")
print(strong_rules)`,
      feedback: "关联规则挖掘需要先将交易数据转换为one-hot格式，然后使用apriori找频繁项集，最后用association_rules计算关联规则。"
    },
    test: [
      {
        id: 1,
        type: "choice",
        question: "置信度P(B|A)=0.8表示什么？",
        options: ["A和B同时出现的概率是0.8", "包含A的交易中有80%也包含B", "B出现的概率是0.8", "A出现的条件下B出现的概率是0.8"],
        correctAnswer: 3,
        explanation: "置信度是条件概率P(B|A)，表示在A发生的条件下B发生的概率。"
      },
      {
        id: 2,
        type: "truefalse",
        question: "提升度 lift = P(A,B) / (P(A) * P(B))",
        correctAnswer: "正确",
        explanation: "提升度衡量了A和B同时出现的概率与独立概率乘积的比值。"
      },
      {
        id: 3,
        type: "fill",
        question: "Apriori算法的主要作用是找出 ___ 项集",
        correctAnswer: "频繁",
        explanation: "Apriori算法用于找出满足最小支持度阈值的频繁项集。"
      }
    ]
  },
  8: {
    learning: [
      {
        title: "K-Means聚类原理",
        content: "K-Means是一种经典的聚类算法，将数据划分为K个簇，使簇内数据点尽可能相似。",
        codeExample: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd

# 准备客户数据
df = pd.DataFrame({
    '年龄': [25, 30, 35, 40, 45, 50, 55, 60],
    '月消费': [5000, 6000, 8000, 12000, 3000, 4000, 7000, 9000],
    '购买频率': [10, 8, 12, 15, 5, 6, 9, 11]
})

# 特征标准化
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df)

# K-Means聚类
kmeans = KMeans(n_clusters=3, random_state=42)
df['客户群'] = kmeans.fit_predict(X_scaled)

# 查看各簇的中心
print("簇中心：")
print(pd.DataFrame(scaler.inverse_transform(kmeans.cluster_centers_),
                   columns=df.columns[:3]))`,
        quiz: [
          {
            question: "K-Means中K代表什么？",
            options: ["特征数量", "聚类的簇数量", "数据点数量", "迭代次数"],
            answer: "B",
            explanation: "K表示要将数据划分成的簇的数量，需要预先指定。"
          }
        ]
      },
      {
        title: "肘部法则选择K值",
        content: "使用肘部法则可以确定最优的聚类数量K。",
        codeExample: `import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# 假设X是标准化后的数据
# 计算不同K值的SSE（簇内误差平方和）
sse = []
K_range = range(1, 11)
for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X_scaled)
    sse.append(kmeans.inertia_)

# 绘制肘部图
plt.figure(figsize=(10, 6))
plt.plot(K_range, sse, 'bo-')
plt.xlabel('Number of Clusters (K)')
plt.ylabel('SSE')
plt.title('Elbow Method')
plt.show()

# 拐点处的K值即为最优K值`,
        quiz: [
          {
            question: "肘部法则选择K值的依据是什么？",
            options: ["SSE最大的点", "SSE最小的点", "SSE下降速度明显变缓的拐点", "K=3"],
            answer: "C",
            explanation: "肘部法则选择SSE下降速度明显变缓的点作为最优K值，此时继续增加K收益递减。"
          }
        ]
      }
    ],
    practice: {
      starterCode: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd

# 客户数据
df = pd.DataFrame({
    '年龄': [22, 25, 30, 35, 40, 45, 50, 55, 60, 65],
    '年收入': [50000, 60000, 80000, 120000, 30000, 40000, 70000, 90000, 150000, 100000],
    '消费积分': [500, 600, 800, 1200, 300, 400, 700, 900, 1500, 1000]
})

# TODO 1: 对特征进行标准化
scaler = StandardScaler()
X_scaled = # 请补充代码

# TODO 2: 使用K=3进行聚类
kmeans = # 请补充代码
df['客户群'] = # 请补充代码

# TODO 3: 查看各群的平均特征值
group_stats = # 请补充代码

# TODO 4: 为各群命名（如高价值用户、潜力用户、普通用户）
print("各群特征：")
print(group_stats)
print("\\n客户分群结果：")
print(df)`,
      referenceCode: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd

df = pd.DataFrame({
    '年龄': [22, 25, 30, 35, 40, 45, 50, 55, 60, 65],
    '年收入': [50000, 60000, 80000, 120000, 30000, 40000, 70000, 90000, 150000, 100000],
    '消费积分': [500, 600, 800, 1200, 300, 400, 700, 900, 1500, 1000]
})

scaler = StandardScaler()
X_scaled = scaler.fit_transform(df)

kmeans = KMeans(n_clusters=3, random_state=42)
df['客户群'] = kmeans.fit_predict(X_scaled)

group_stats = df.groupby('客户群')[['年龄', '年收入', '消费积分']].mean()

print("各群特征：")
print(group_stats)
print("\\n客户分群结果：")
print(df)`,
      feedback: "K-Means聚类前需要标准化特征，fit_predict同时进行训练和预测，groupby可查看各群统计信息。"
    },
    test: [
      {
        id: 1,
        type: "choice",
        question: "K-Means聚类前为什么要标准化数据？",
        options: ["加快计算速度", "消除量纲影响，避免大数值特征主导聚类结果", "提高准确率", "减少内存使用"],
        correctAnswer: 1,
        explanation: "不同特征的量纲和数值范围不同，标准化可以消除这种影响，使各特征对聚类结果有同等贡献。"
      },
      {
        id: 2,
        type: "truefalse",
        question: "K-Means的初始簇中心是随机选择的",
        correctAnswer: "正确",
        explanation: "K-Means初始化时随机选择K个点作为初始簇中心，这也是为什么通常需要多次运行取最优结果。"
      },
      {
        id: 3,
        type: "fill",
        question: "K-Means的SSE(簇内误差平方和)也称为 ___",
        correctAnswer: "inertia",
        explanation: "KMeans对象的inertia_属性保存了SSE值，用于评估聚类效果。"
      }
    ]
  },
  9: {
    learning: [
      {
        title: "线性回归基础",
        content: "线性回归是最基础的监督学习算法，用于预测连续值输出。",
        codeExample: `from sklearn.linear_model import LinearRegression
import pandas as pd
import numpy as np

# 准备数据
df = pd.DataFrame({
    '广告投入': [1000, 2000, 3000, 4000, 5000],
    '季节系数': [1.0, 1.2, 1.5, 1.3, 1.8],
    '销售额': [15000, 28000, 45000, 52000, 75000]
})

# 特征和目标
X = df[['广告投入', '季节系数']]
y = df['销售额']

# 创建并训练模型
model = LinearRegression()
model.fit(X, y)

# 查看模型参数
print(f"截距: {model.intercept_}")
print(f"系数: {model.coef_}")

# 预测
new_data = [[3000, 1.4]]
prediction = model.predict(new_data)
print(f"预测销售额: {prediction[0]}")`,
        quiz: [
          {
            question: "LinearRegression的fit()方法作用是？",
            options: ["预测", "训练模型", "评估模型", "保存模型"],
            answer: "B",
            explanation: "fit()方法接收特征X和目标y，用于训练（拟合）线性回归模型。"
          }
        ]
      },
      {
        title: "模型评估指标",
        content: "评估线性回归模型常用R²分数和MSE指标。",
        codeExample: `from sklearn.metrics import r2_score, mean_squared_error
import numpy as np

# 假设y_true是真实值，y_pred是预测值
y_true = np.array([15000, 28000, 45000, 52000, 75000])
y_pred = np.array([14800, 28500, 44000, 53000, 74000])

# R²分数（决定系数）
r2 = r2_score(y_true, y_pred)
print(f"R² Score: {r2:.4f}")

# 均方误差
mse = mean_squared_error(y_true, y_pred)
print(f"MSE: {mse:.2f}")

# RMSE（均方根误差）
rmse = np.sqrt(mse)
print(f"RMSE: {rmse:.2f}")

# R²取值范围通常是0-1，越接近1表示模型越好`,
        quiz: [
          {
            question: "R²分数为0.85表示什么？",
            options: ["模型解释了85%的方差", "预测误差是85", "模型准确率是85%", "85%的预测是正确的"],
            answer: "A",
            explanation: "R²表示模型解释的方差比例，0.85表示模型解释了85%的目标变量变异。"
          }
        ]
      }
    ],
    practice: {
      starterCode: `from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import pandas as pd
import numpy as np

# 历史销售数据
df = pd.DataFrame({
    '月份': [1, 2, 3, 4, 5, 6],
    '广告投入': [10000, 15000, 12000, 18000, 20000, 25000],
    '促销活动': [0, 1, 0, 1, 1, 1],
    '销售额': [80000, 120000, 95000, 145000, 160000, 210000]
})

# TODO 1: 准备特征和目标
X = # 请补充代码
y = # 请补充代码

# TODO 2: 创建并训练线性回归模型
model = # 请补充代码
# 请补充代码

# TODO 3: 在训练数据上预测
y_pred = # 请补充代码

# TODO 4: 计算R²分数和MSE
r2 = # 请补充代码
mse = # 请补充代码

print(f"R² Score: {r2:.4f}")
print(f"MSE: {mse:.2f}")

# TODO 5: 预测下月销售额（广告投入=30000，有促销活动）
next_month = # 请补充代码
prediction = # 请补充代码
print(f"下月预测销售额: {prediction[0]:.0f}")`,
      referenceCode: `from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import pandas as pd
import numpy as np

df = pd.DataFrame({
    '月份': [1, 2, 3, 4, 5, 6],
    '广告投入': [10000, 15000, 12000, 18000, 20000, 25000],
    '促销活动': [0, 1, 0, 1, 1, 1],
    '销售额': [80000, 120000, 95000, 145000, 160000, 210000]
})

X = df[['广告投入', '促销活动']]
y = df['销售额']

model = LinearRegression()
model.fit(X, y)

y_pred = model.predict(X)

r2 = r2_score(y, y_pred)
mse = mean_squared_error(y, y_pred)

print(f"R² Score: {r2:.4f}")
print(f"MSE: {mse:.2f}")

next_month = [[30000, 1]]
prediction = model.predict(next_month)
print(f"下月预测销售额: {prediction[0]:.0f}")`,
      feedback: "线性回归模型训练使用fit()，预测使用predict()。R²分数越接近1越好，MSE越小越好。"
    },
    test: [
      {
        id: 1,
        type: "choice",
        question: "线性回归模型predict()方法的作用是？",
        options: ["训练模型", "根据输入特征预测输出", "计算误差", "保存模型"],
        correctAnswer: 1,
        explanation: "predict()方法接收新数据的特征，返回对应的预测值。"
      },
      {
        id: 2,
        type: "truefalse",
        question: "R²分数可以为负数",
        correctAnswer: "正确",
        explanation: "如果模型预测比直接用均值还差，R²会为负，表示模型完全失效。"
      },
      {
        id: 3,
        type: "fill",
        question: "均方根误差RMSE是MSE的 ___",
        correctAnswer: "平方根",
        explanation: "RMSE = sqrt(MSE)，将误差恢复到原始数据的单位，更容易解释。"
      }
    ]
  },
  10: {
    learning: [
      {
        title: "数据分析报告结构",
        content: "一份完整的数据分析报告通常包含：背景介绍、数据概览、分析方法、核心发现、建议与结论。",
        codeExample: `# 数据分析报告模板结构

1. **背景介绍**
   - 业务问题描述
   - 分析目标明确

2. **数据概览**
   - 数据来源说明
   - 数据基本情况（记录数、字段）
   - 数据质量评估

3. **分析方法**
   - 描述性统计
   - 数据可视化
   - 高级分析（如有）

4. **核心发现**
   - 关键指标分析
   - 趋势洞察
   - 异常发现

5. **建议与结论**
   - 针对问题的建议
   - 后续行动项`,
        quiz: [
          {
            question: "数据分析报告的第一部分通常是什么？",
            options: ["数据可视化", "结论建议", "背景介绍", "数据处理"],
            answer: "C",
            explanation: "报告开头需要介绍背景和目标，让读者理解分析的目的和上下文。"
          }
        ]
      },
      {
        title: "数据可视化原则",
        content: "好的数据可视化应该：选择合适的图表类型、突出关键信息、保持简洁易读。",
        codeExample: `import matplotlib.pyplot as plt
import pandas as pd

# 销售额数据
df = pd.DataFrame({
    '月份': ['1月', '2月', '3月', '4月', '5月', '6月'],
    '销售额': [100, 120, 150, 130, 180, 200],
    '目标': [110, 110, 130, 140, 160, 180]
})

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 折线图展示趋势
axes[0].plot(df['月份'], df['销售额'], 'b-o', label='实际销售额')
axes[0].plot(df['月份'], df['目标'], 'r--', label='目标')
axes[0].set_title('销售额趋势')
axes[0].legend()

# 柱状图展示对比
axes[1].bar(df['月份'], df['销售额'], alpha=0.7)
axes[1].set_title('月度销售额')
axes[1].set_ylabel('销售额（万元）')

plt.tight_layout()
plt.show()`,
        quiz: [
          {
            question: "展示数据趋势应该使用哪种图表？",
            options: ["饼图", "柱状图", "折线图", "散点图"],
            answer: "C",
            explanation: "折线图最适合展示数据随时间变化的趋势，其他图表更适合展示分布或对比。"
          }
        ]
      }
    ],
    practice: {
      starterCode: `import pandas as pd
import matplotlib.pyplot as plt

# 假设这是整理好的销售数据
sales_data = pd.DataFrame({
    '地区': ['华北', '华东', '华南', '西南', '西北'],
    '销售额': [150000, 220000, 180000, 90000, 60000],
    '增长率': [0.15, 0.25, 0.18, 0.08, 0.05]
})

# TODO 1: 计算各地区销售额占比
sales_data['占比'] = # 请补充代码

# TODO 2: 找出增长率最高的地区
top_growth = # 请补充代码

# TODO 3: 创建可视化
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# 销售额柱状图
axes[0].bar(sales_data['地区'], # 请补充代码)
axes[0].set_title('各地区销售额')

# 增长率横向柱状图
axes[1].barh(sales_data['地区'], # 请补充代码)
axes[1].set_title('各地区增长率')

plt.tight_layout()
plt.show()

print("各地区销售占比：")
print(sales_data[['地区', '占比']])
print(f"\\n增长最快的地区: {top_growth}")`,
      referenceCode: `import pandas as pd
import matplotlib.pyplot as plt

sales_data = pd.DataFrame({
    '地区': ['华北', '华东', '华南', '西南', '西北'],
    '销售额': [150000, 220000, 180000, 90000, 60000],
    '增长率': [0.15, 0.25, 0.18, 0.08, 0.05]
})

sales_data['占比'] = sales_data['销售额'] / sales_data['销售额'].sum()

top_growth = sales_data.loc[sales_data['增长率'].idxmax(), '地区']

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

axes[0].bar(sales_data['地区'], sales_data['销售额'])
axes[0].set_title('各地区销售额')

axes[1].barh(sales_data['地区'], sales_data['增长率'])
axes[1].set_title('各地区增长率')

plt.tight_layout()
plt.show()

print("各地区销售占比：")
print(sales_data[['地区', '占比']])
print(f"\\n增长最快的地区: {top_growth}")`,
      feedback: "数据分析报告需要包含数据处理、可视化和结论。占比用销售额除以总和，idxmax()找最大值索引。"
    },
    test: [
      {
        id: 1,
        type: "choice",
        question: "展示各部分占比关系，使用哪种图表最合适？",
        options: ["折线图", "散点图", "饼图", "柱状图"],
        correctAnswer: "C",
        explanation: "饼图最适合展示各部分占总体的比例关系，直观显示占比大小。"
      },
      {
        id: 2,
        type: "truefalse",
        question: "数据分析报告必须包含高级机器学习模型",
        correctAnswer: "错误",
        explanation: "报告应根据实际需求选择合适的方法，简单有效的分析胜过复杂的模型。"
      },
      {
        id: 3,
        type: "fill",
        question: "计算某列占总和的比例，公式是该列 / ___(1).___(2)",
        correctAnswer: "列.sum()",
        explanation: "用该列的值除以sum()得到的总和，即得到各部分占比。"
      }
    ]
  }
};
