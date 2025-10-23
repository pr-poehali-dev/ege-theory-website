import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Task {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  solved: boolean;
}

const Index = () => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [testScore, setTestScore] = useState<number | null>(null);

  const tasks: Task[] = [
    { id: 1, title: 'Вероятность события', difficulty: 'easy', solved: false },
    { id: 2, title: 'Правило суммы', difficulty: 'easy', solved: false },
    { id: 3, title: 'Правило произведения', difficulty: 'medium', solved: false },
    { id: 4, title: 'Независимые события', difficulty: 'medium', solved: false },
    { id: 5, title: 'Условная вероятность', difficulty: 'hard', solved: false },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легко';
      case 'medium': return 'Средне';
      case 'hard': return 'Сложно';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="Dices" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Теория Вероятности</h1>
                <p className="text-sm text-gray-600">Подготовка к заданию 4 ЕГЭ</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                <Icon name="Target" size={14} className="mr-1" />
                Задач решено: 0/5
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="theory" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 h-auto p-1">
            <TabsTrigger value="theory" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Теория
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3">
              <Icon name="ListChecks" size={18} className="mr-2" />
              Задачи
            </TabsTrigger>
            <TabsTrigger value="practice" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3">
              <Icon name="PenTool" size={18} className="mr-2" />
              Практика
            </TabsTrigger>
            <TabsTrigger value="tests" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white py-3">
              <Icon name="ClipboardCheck" size={18} className="mr-2" />
              Тесты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theory" className="space-y-6 animate-in fade-in-50 duration-500">
            <Card className="border-l-4 border-l-blue-600 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Lightbulb" className="text-blue-600" />
                  Основные понятия
                </CardTitle>
                <CardDescription>Фундаментальные определения теории вероятности</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-lg mb-2 text-blue-900">Вероятность события</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Вероятность события A — это отношение числа благоприятных исходов к общему числу возможных исходов.
                  </p>
                  <div className="mt-3 p-3 bg-white rounded border border-blue-300">
                    <p className="text-center font-mono text-xl">P(A) = m/n</p>
                    <p className="text-sm text-gray-600 text-center mt-2">
                      где m — число благоприятных исходов, n — общее число исходов
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-lg mb-2 text-green-900">Правило суммы</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Вероятность того, что произойдет хотя бы одно из несовместных событий A или B:
                  </p>
                  <div className="mt-3 p-3 bg-white rounded border border-green-300">
                    <p className="text-center font-mono text-xl">P(A ∪ B) = P(A) + P(B)</p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-lg mb-2 text-yellow-900">Правило произведения</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Вероятность одновременного наступления двух независимых событий A и B:
                  </p>
                  <div className="mt-3 p-3 bg-white rounded border border-yellow-300">
                    <p className="text-center font-mono text-xl">P(A ∩ B) = P(A) × P(B)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" className="text-green-600" />
                  Важные формулы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="font-semibold mb-2">Противоположное событие</p>
                    <p className="font-mono">P(Ā) = 1 - P(A)</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="font-semibold mb-2">Достоверное событие</p>
                    <p className="font-mono">P(Ω) = 1</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="font-semibold mb-2">Невозможное событие</p>
                    <p className="font-mono">P(∅) = 0</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="font-semibold mb-2">Условная вероятность</p>
                    <p className="font-mono">P(A|B) = P(A∩B) / P(B)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 animate-in fade-in-50 duration-500">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Типовые задачи ЕГЭ</CardTitle>
                <CardDescription>Разбор задач с подробными решениями</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-blue-400"
                      onClick={() => {
                        setSelectedTask(task.id);
                        setShowSolution(false);
                        setUserAnswer('');
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getDifficultyColor(task.difficulty)}`}></div>
                          <span className="font-semibold">Задача {task.id}</span>
                          <span className="text-gray-600">{task.title}</span>
                        </div>
                        <Badge variant="outline">{getDifficultyText(task.difficulty)}</Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedTask && (
                  <Card className="mt-6 border-2 border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-blue-900">Задача {selectedTask}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-gray-800 leading-relaxed">
                          В коробке 15 шаров: 6 красных и 9 синих. Случайным образом вынимают один шар. 
                          Какова вероятность того, что вынутый шар окажется красным?
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Ваш ответ:</label>
                        <input
                          type="text"
                          placeholder="Введите ответ (например, 0.4 или 2/5)"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button onClick={() => setShowSolution(true)} variant="outline" className="flex-1">
                          <Icon name="Eye" size={16} className="mr-2" />
                          Показать решение
                        </Button>
                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                          <Icon name="CheckCircle" size={16} className="mr-2" />
                          Проверить ответ
                        </Button>
                      </div>

                      {showSolution && (
                        <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300 animate-in fade-in-50">
                          <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                            <Icon name="BookOpen" size={18} />
                            Решение
                          </h4>
                          <div className="space-y-2 text-gray-800">
                            <p><strong>1.</strong> Определяем общее число исходов: n = 15 (всего шаров)</p>
                            <p><strong>2.</strong> Определяем число благоприятных исходов: m = 6 (красных шаров)</p>
                            <p><strong>3.</strong> Применяем формулу вероятности: P(A) = m/n = 6/15</p>
                            <p><strong>4.</strong> Сокращаем дробь: 6/15 = 2/5 = 0.4</p>
                            <div className="mt-4 p-3 bg-white rounded border border-green-400">
                              <p className="font-bold text-center text-lg text-green-900">Ответ: 0.4 (или 2/5)</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6 animate-in fade-in-50 duration-500">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Target" className="text-blue-600" />
                  Практический тренажер
                </CardTitle>
                <CardDescription>Решайте задачи и отрабатывайте навыки</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-lg mb-4 text-blue-900">Генератор задач</h3>
                  <p className="text-gray-700 mb-4">
                    Выберите тип задачи для практики. Система автоматически сгенерирует новые условия.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                      <Icon name="Dice1" size={24} />
                      <span>Простые события</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                      <Icon name="Dice3" size={24} />
                      <span>Сложные события</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                      <Icon name="Dice5" size={24} />
                      <span>Смешанные</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Ваш прогресс</h4>
                    <span className="text-sm text-gray-600">0 задач решено</span>
                  </div>
                  <Progress value={0} className="h-3" />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-sm text-green-900">Правильных ответов</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-green-700">0</p>
                    </CardContent>
                  </Card>
                  <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-sm text-red-900">Ошибок</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-red-700">0</p>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-sm text-blue-900">Точность</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-blue-700">—</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6 animate-in fade-in-50 duration-500">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Award" className="text-blue-600" />
                  Тестирование знаний
                </CardTitle>
                <CardDescription>Проверьте свою готовность к ЕГЭ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-2 border-blue-200 hover:border-blue-400 cursor-pointer transition-all hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icon name="Timer" size={20} className="text-blue-600" />
                        Быстрый тест
                      </CardTitle>
                      <CardDescription>5 вопросов • 10 минут</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        Начать тест
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 hover:border-green-400 cursor-pointer transition-all hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icon name="Target" size={20} className="text-green-600" />
                        Полный тест
                      </CardTitle>
                      <CardDescription>15 вопросов • 30 минут</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Начать тест
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {testScore !== null && (
                  <Card className="border-2 border-blue-300 bg-blue-50 animate-in fade-in-50">
                    <CardHeader>
                      <CardTitle className="text-blue-900">Результаты теста</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-blue-700 mb-2">{testScore}%</div>
                        <p className="text-gray-700">Правильных ответов</p>
                      </div>
                      <Progress value={testScore} className="h-4" />
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-center text-gray-800">
                          {testScore >= 80 ? 'Отличный результат! 🎉' : 
                           testScore >= 60 ? 'Хороший результат! Продолжайте практиковаться' : 
                           'Рекомендуем повторить теорию и решить больше задач'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" className="text-yellow-700 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-yellow-900 mb-1">Совет</p>
                      <p className="text-gray-700 text-sm">
                        Перед началом теста убедитесь, что изучили все темы в разделе "Теория" 
                        и решили достаточно задач для практики.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t bg-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 Теория Вероятности • Подготовка к ЕГЭ по математике</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
