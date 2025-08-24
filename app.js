// Application Data
const appData = {
  user: {
    name: "Alex",
    points: 1247,
    level: 12,
    levelTitle: "Focus Master",
    currentStreak: 5,
    tasksCompletedToday: 3,
    focusSessionsToday: 2
  },
  tasks: [
    {
      id: 1,
      title: "Review presentation slides",
      category: "Work",
      estimatedTime: 30,
      priority: 3,
      completed: false,
      day: "Monday"
    },
    {
      id: 2,
      title: "Call dentist",
      category: "Personal",
      estimatedTime: 5,
      priority: 2,
      completed: true,
      day: "Monday"
    },
    {
      id: 3,
      title: "Grocery shopping",
      category: "Personal",
      estimatedTime: 45,
      priority: 2,
      completed: false,
      day: "Tuesday"
    },
    {
      id: 4,
      title: "Read research paper",
      category: "Learning",
      estimatedTime: 60,
      priority: 3,
      completed: true,
      day: "Monday"
    },
    {
      id: 5,
      title: "Exercise routine",
      category: "Health",
      estimatedTime: 30,
      priority: 2,
      completed: true,
      day: "Monday"
    }
  ],
  achievements: [
    {
      name: "Early Bird",
      description: "Completed task before 9 AM",
      icon: "🌅",
      earned: true
    },
    {
      name: "Focus Ninja",
      description: "5 pomodoros in one day",
      icon: "🥷",
      earned: true
    },
    {
      name: "Streak Master",
      description: "7-day completion streak",
      icon: "🔥",
      earned: false
    },
    {
      name: "Task Crusher",
      description: "Completed 10 tasks in a week",
      icon: "💪",
      earned: true
    }
  ],
  brainDumpEntries: [
    {
      id: 1,
      text: "Remember to buy birthday gift for Sarah",
      timestamp: "2025-08-23T10:30:00",
      tags: ["reminder", "personal"]
    },
    {
      id: 2,
      text: "Research vacation destinations for December",
      timestamp: "2025-08-23T14:15:00",
      tags: ["ideas", "travel"]
    },
    {
      id: 3,
      text: "Follow up on job application - due Friday",
      timestamp: "2025-08-23T16:45:00",
      tags: ["work", "deadline"]
    }
  ],
  weeklyProgress: [
    {day: "Mon", tasksCompleted: 4, focusHours: 2.5},
    {day: "Tue", tasksCompleted: 3, focusHours: 1.8},
    {day: "Wed", tasksCompleted: 5, focusHours: 3.2},
    {day: "Thu", tasksCompleted: 2, focusHours: 1.5},
    {day: "Fri", tasksCompleted: 6, focusHours: 4.0},
    {day: "Sat", tasksCompleted: 3, focusHours: 2.0},
    {day: "Sun", tasksCompleted: 4, focusHours: 2.8}
  ],
  taskBreakdownExamples: {
    "Prepare for job interview": [
      "Research the company and role",
      "Review common interview questions", 
      "Prepare specific examples from experience",
      "Choose and prepare outfit",
      "Print extra copies of resume"
    ],
    "Write research paper": [
      "Create outline and thesis statement",
      "Gather and review sources",
      "Write introduction paragraph",
      "Develop body paragraphs with evidence",
      "Write conclusion and proofread"
    ]
  }
};

// Timer state
const timerState = {
  isRunning: false,
  isPaused: false,
  timeLeft: 25 * 60,
  totalTime: 25 * 60,
  currentTask: null,
  intervalId: null
};

// Global chart references
let weeklyChart = null;
let trendsChart = null;

// Navigation Functions
function setupNavigation() {
  // Add click event listeners to navigation tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      switchToTab(tabName);
    });
  });
}

function setupQuickActions() {
  // Setup quick action buttons with enhanced functionality
  const focusBtn = document.querySelector('.focus-btn');
  const breakBtn = document.querySelector('.break-btn');
  const dumpBtn = document.querySelector('.dump-btn');
  
  if (focusBtn) {
    focusBtn.addEventListener('click', function() {
      // Add visual feedback
      this.classList.add('btn-clicked');
      setTimeout(() => this.classList.remove('btn-clicked'), 200);
      
      // Switch to timer tab and show focus message
      switchToTab('timer');
      showQuickActionFeedback('Focus Timer activated! Select a task to begin.');
    });
  }
  
  if (breakBtn) {
    breakBtn.addEventListener('click', function() {
      // Add visual feedback
      this.classList.add('btn-clicked');
      setTimeout(() => this.classList.remove('btn-clicked'), 200);
      
      // Show break suggestions
      showBreakSuggestions();
    });
  }
  
  if (dumpBtn) {
    dumpBtn.addEventListener('click', function() {
      // Add visual feedback
      this.classList.add('btn-clicked');
      setTimeout(() => this.classList.remove('btn-clicked'), 200);
      
      // Switch to brain dump tab and focus on input
      switchToTab('braindump');
      setTimeout(() => {
        const brainDumpInput = document.getElementById('brain-dump-text');
        if (brainDumpInput) {
          brainDumpInput.focus();
        }
      }, 300);
      showQuickActionFeedback('Brain Dump ready! Capture your thoughts.');
    });
  }
  
  // Setup add task button with enhanced functionality
  const addTaskBtn = document.querySelector('.add-task-btn');
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', function() {
      // Add visual feedback
      this.classList.add('btn-clicked');
      setTimeout(() => this.classList.remove('btn-clicked'), 200);
      
      // Switch to planner tab
      switchToTab('planner');
      showQuickActionFeedback('Task Planner opened! Add your new task.');
    });
  }
  
  // Setup new quick action buttons
  const quickTaskBtn = document.querySelector('.quick-task-btn');
  const progressBtn = document.querySelector('.progress-btn');
  const goalsBtn = document.querySelector('.goals-btn');
  
  if (quickTaskBtn) {
    quickTaskBtn.addEventListener('click', function() {
      // Add visual feedback
      this.classList.add('btn-clicked');
      setTimeout(() => this.classList.remove('btn-clicked'), 200);
      
      // Switch to planner tab and then open modal
      switchToTab('planner');
      setTimeout(() => {
        showAddTaskModal();
      }, 300);
      showQuickActionFeedback('Task Planner opened! Add your new task.');
    });
  }
  
  if (progressBtn) {
    progressBtn.addEventListener('click', function() {
      // Add visual feedback
      this.classList.add('btn-clicked');
      setTimeout(() => this.classList.remove('btn-clicked'), 200);
      
      // Switch to progress tab
      switchToTab('progress');
      showQuickActionFeedback('Progress tracking opened!');
    });
  }
  
  if (goalsBtn) {
    goalsBtn.addEventListener('click', function() {
      // Add visual feedback
      this.classList.add('btn-clicked');
      setTimeout(() => this.classList.remove('btn-clicked'), 200);
      
      // Show goals review modal
      showGoalsReview();
      showQuickActionFeedback('Daily goals review opened!');
    });
  }
}

function showQuickActionFeedback(message) {
  // Create or update feedback notification
  let feedback = document.getElementById('quick-action-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.id = 'quick-action-feedback';
    feedback.className = 'quick-action-feedback';
    document.body.appendChild(feedback);
  }
  
  feedback.textContent = message;
  feedback.classList.add('show');
  
  // Hide after 3 seconds
  setTimeout(() => {
    feedback.classList.remove('show');
  }, 3000);
}

function showBreakSuggestions() {
  // Create break suggestions modal
  let breakModal = document.getElementById('break-suggestions');
  if (!breakModal) {
    breakModal = document.createElement('div');
    breakModal.id = 'break-suggestions';
    breakModal.className = 'break-modal';
    document.body.appendChild(breakModal);
  }
  
  breakModal.innerHTML = `
    <div class="break-content">
      <div class="break-header">
        <h3><i class="fa-solid fa-coffee"></i> Take a Break</h3>
        <button class="close-break" onclick="closeBreakSuggestions()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      <div class="break-suggestions">
        <div class="break-option" onclick="startBreakTimer(5)">
          <i class="fa-solid fa-clock"></i>
          <div>
            <h4>Quick Break</h4>
            <p>5 minutes - Stretch & breathe</p>
          </div>
        </div>
        <div class="break-option" onclick="startBreakTimer(15)">
          <i class="fa-solid fa-walking"></i>
          <div>
            <h4>Active Break</h4>
            <p>15 minutes - Walk or light exercise</p>
          </div>
        </div>
        <div class="break-option" onclick="startBreakTimer(30)">
          <i class="fa-solid fa-utensils"></i>
          <div>
            <h4>Meal Break</h4>
            <p>30 minutes - Eat & recharge</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  breakModal.classList.add('show');
}

function closeBreakSuggestions() {
  const breakModal = document.getElementById('break-suggestions');
  if (breakModal) {
    breakModal.classList.remove('show');
  }
}

function startBreakTimer(minutes) {
  closeBreakSuggestions();
  showQuickActionFeedback(`${minutes}-minute break started! Enjoy your time off.`);
  
  // Set a timer notification (in a real app, this would be more sophisticated)
  setTimeout(() => {
    showQuickActionFeedback('Break time is over! Ready to get back to work?');
  }, minutes * 60 * 1000);
}

function showGoalsReview() {
  // Create goals review modal
  let goalsModal = document.getElementById('goals-review');
  if (!goalsModal) {
    goalsModal = document.createElement('div');
    goalsModal.id = 'goals-review';
    goalsModal.className = 'break-modal';
    document.body.appendChild(goalsModal);
  }
  
  // Get today's incomplete tasks for goal review
  const todaysTasks = appData.tasks.filter(task => !task.completed);
  const completedToday = appData.tasks.filter(task => task.completed).length;
  
  goalsModal.innerHTML = `
    <div class="break-content">
      <div class="break-header">
        <h3><i class="fa-solid fa-bullseye"></i> Daily Goals Review</h3>
        <button class="close-break" onclick="closeGoalsReview()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      <div class="goals-content">
        <div class="goals-summary">
          <h4>Today's Progress</h4>
          <p><strong>${completedToday}</strong> tasks completed • <strong>${todaysTasks.length}</strong> remaining</p>
        </div>
        <div class="priority-goals">
          <h4>Priority Tasks</h4>
          ${todaysTasks.slice(0, 3).map(task => `
            <div class="goal-item">
              <i class="fa-solid fa-circle-dot"></i>
              <span>${task.title}</span>
              <span class="goal-time">${task.estimatedTime}min</span>
            </div>
          `).join('')}
          ${todaysTasks.length === 0 ? '<p class="no-goals">All tasks completed! Great job! 🎉</p>' : ''}
        </div>
        <div class="goals-actions">
          <button class="btn-primary" onclick="closeGoalsReview(); switchToTab('planner');">
            Manage Tasks
          </button>
          <button class="btn-secondary" onclick="closeGoalsReview(); switchToTab('timer');">
            Start Focus Session
          </button>
        </div>
      </div>
    </div>
  `;
  
  goalsModal.classList.add('show');
}

function closeGoalsReview() {
  const goalsModal = document.getElementById('goals-review');
  if (goalsModal) {
    goalsModal.classList.remove('show');
  }
}

function switchToTab(tabName) {
  console.log('Switching to tab:', tabName);
  
  // Update nav tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Find and activate the clicked tab
  const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Update views - hide all first
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
    view.style.display = 'none';
    console.log('Hiding view:', view.id);
  });
  
  // Show target view
  const targetView = document.getElementById(tabName);
  if (targetView) {
    targetView.classList.add('active');
    targetView.style.display = 'block';
    console.log('Showing view:', tabName);
  } else {
    console.error('Target view not found:', tabName);
  }

  // Render content for specific views only when tab is activated
  if (tabName === 'progress') {
    console.log('Rendering Progress tab content...');
    setTimeout(() => {
      renderProgressTracker();
    }, 100);
  } else if (tabName === 'planner') {
    console.log('Rendering Task Planner content...');
    setTimeout(() => {
      renderTaskPlanner();
    }, 100);
  } else if (tabName === 'timer') {
    console.log('Rendering Focus Timer content...');
    setTimeout(() => {
      renderFocusTimer();
    }, 100);
  } else if (tabName === 'braindump') {
    console.log('Rendering Brain Dump content...');
    setTimeout(() => {
      renderBrainDump();
    }, 100);
  }
}

// Task Management Functions
function toggleTask(taskId) {
  console.log('Toggling task:', taskId);
  const task = appData.tasks.find(t => t.id === taskId);
  if (task) {
    const wasCompleted = task.completed;
    task.completed = !task.completed;
    
    if (task.completed && !wasCompleted) {
      // Task completed - award points based on priority
      const pointsAwarded = task.priority === 3 ? 25 : task.priority === 2 ? 15 : 10;
      appData.user.points += pointsAwarded;
      appData.user.tasksCompletedToday++;
      
      // Show celebration with task-specific message
      showTaskCompletionCelebration(task, pointsAwarded);
      
      // Check for achievements
      checkTaskAchievements();
      
    } else if (!task.completed && wasCompleted) {
      // Task uncompleted - remove points
      const pointsRemoved = task.priority === 3 ? 25 : task.priority === 2 ? 15 : 10;
      appData.user.points -= pointsRemoved;
      appData.user.tasksCompletedToday = Math.max(0, appData.user.tasksCompletedToday - 1);
    }
    
    // Update all relevant displays
    updateUserStats();
    renderDashboard();
    renderTaskPlanner(); // This will only render weekly calendar if planner tab is active
    renderFocusTimer(); // Update focus timer task list
  }
}

function showCelebration() {
  const celebration = document.getElementById('celebration');
  if (celebration) {
    celebration.classList.remove('hidden');
    setTimeout(() => {
      celebration.classList.add('hidden');
    }, 2000);
  }
}

function showTaskCompletionCelebration(task, pointsAwarded) {
  // Create celebration overlay if it doesn't exist
  let celebrationOverlay = document.getElementById('task-celebration');
  if (!celebrationOverlay) {
    celebrationOverlay = document.createElement('div');
    celebrationOverlay.id = 'task-celebration';
    celebrationOverlay.className = 'celebration-overlay';
    document.body.appendChild(celebrationOverlay);
  }
  
  // Set celebration content
  celebrationOverlay.innerHTML = `
    <div class="celebration-content">
      <div class="celebration-icon">
        <i class="fa-solid fa-star"></i>
      </div>
      <div class="celebration-text">
        <h3>Task Completed!</h3>
        <p>"${task.title}"</p>
        <div class="points-awarded">+${pointsAwarded} Focus Points</div>
      </div>
    </div>
  `;
  
  // Show celebration
  celebrationOverlay.classList.add('show');
  
  // Hide after 3 seconds
  setTimeout(() => {
    celebrationOverlay.classList.remove('show');
  }, 3000);
}

function checkTaskAchievements() {
  const completedToday = appData.user.tasksCompletedToday;
  const totalCompleted = appData.tasks.filter(t => t.completed).length;
  
  // Check for "Task Crusher" achievement (10 tasks completed total)
  const taskCrusher = appData.achievements.find(a => a.name === "Task Crusher");
  if (taskCrusher && !taskCrusher.earned && totalCompleted >= 10) {
    taskCrusher.earned = true;
    showAchievementUnlocked(taskCrusher);
  }
  
  // Check for "Early Bird" achievement (task completed before 9 AM)
  const now = new Date();
  const earlyBird = appData.achievements.find(a => a.name === "Early Bird");
  if (earlyBird && !earlyBird.earned && now.getHours() < 9) {
    earlyBird.earned = true;
    showAchievementUnlocked(earlyBird);
  }
}

function showAchievementUnlocked(achievement) {
  // Create achievement notification
  let achievementNotification = document.getElementById('achievement-notification');
  if (!achievementNotification) {
    achievementNotification = document.createElement('div');
    achievementNotification.id = 'achievement-notification';
    achievementNotification.className = 'achievement-notification';
    document.body.appendChild(achievementNotification);
  }
  
  // Map emoji icons to FontAwesome icons
  const iconMap = {
    '🌅': '<i class="fa-solid fa-dove"></i>',
    '🥷': '<i class="fa-solid fa-user-ninja"></i>',
    '🔥': '<i class="fa-solid fa-fire"></i>',
    '💪': '<i class="fa-solid fa-hand-back-fist"></i>'
  };
  
  achievementNotification.innerHTML = `
    <div class="achievement-content">
      <div class="achievement-badge">
        ${iconMap[achievement.icon] || achievement.icon}
      </div>
      <div class="achievement-info">
        <h4>Achievement Unlocked!</h4>
        <p><strong>${achievement.name}</strong></p>
        <p>${achievement.description}</p>
      </div>
    </div>
  `;
  
  achievementNotification.classList.add('show');
  
  setTimeout(() => {
    achievementNotification.classList.remove('show');
  }, 4000);
}

function updateUserStats() {
  // Update header stats
  const pointsElement = document.querySelector('.points');
  const levelElement = document.querySelector('.level');
  const streakElement = document.querySelector('.streak');
  
  if (pointsElement) {
    pointsElement.textContent = `${appData.user.points.toLocaleString()} Focus Points`;
  }
  
  if (levelElement) {
    // Check for level up
    checkLevelUp();
    levelElement.textContent = `Level ${appData.user.level}: ${appData.user.levelTitle}`;
  }
  
  if (streakElement) {
    streakElement.textContent = `${appData.user.currentStreak}-day streak`;
  }
  
  // Update progress bar in welcome card
  updateLevelProgress();
  
  // Update dashboard statistics
  renderDashboardStats();
}

function checkLevelUp() {
  const pointsPerLevel = 500;
  const newLevel = Math.floor(appData.user.points / pointsPerLevel) + 1;
  
  if (newLevel > appData.user.level) {
    const oldLevel = appData.user.level;
    appData.user.level = newLevel;
    
    // Update level title based on level
    if (newLevel >= 20) appData.user.levelTitle = "Productivity Legend";
    else if (newLevel >= 15) appData.user.levelTitle = "Focus Guru";
    else if (newLevel >= 10) appData.user.levelTitle = "Focus Master";
    else if (newLevel >= 5) appData.user.levelTitle = "Task Warrior";
    else appData.user.levelTitle = "Focus Apprentice";
    
    // Show level up celebration
    showLevelUpCelebration(oldLevel, newLevel);
  }
}

function updateLevelProgress() {
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  
  if (progressFill && progressText) {
    const pointsPerLevel = 500;
    const currentLevelPoints = appData.user.points % pointsPerLevel;
    const progressPercentage = (currentLevelPoints / pointsPerLevel) * 100;
    const pointsToNext = pointsPerLevel - currentLevelPoints;
    
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${pointsToNext} points to Level ${appData.user.level + 1}`;
  }
}

function showLevelUpCelebration(oldLevel, newLevel) {
  let levelUpOverlay = document.getElementById('level-up-celebration');
  if (!levelUpOverlay) {
    levelUpOverlay = document.createElement('div');
    levelUpOverlay.id = 'level-up-celebration';
    levelUpOverlay.className = 'celebration-overlay';
    document.body.appendChild(levelUpOverlay);
  }
  
  levelUpOverlay.innerHTML = `
    <div class="celebration-content level-up-content">
      <div class="celebration-icon">
        <i class="fa-solid fa-trophy"></i>
      </div>
      <div class="celebration-text">
        <h3>Level Up!</h3>
        <p>Level ${oldLevel} → Level ${newLevel}</p>
        <div class="level-title">${appData.user.levelTitle}</div>
      </div>
    </div>
  `;
  
  levelUpOverlay.classList.add('show');
  
  setTimeout(() => {
    levelUpOverlay.classList.remove('show');
  }, 4000);
}

// AI Task Breakdown
function breakdownTask() {
  console.log('Breaking down task');
  const input = document.getElementById('complex-task');
  const resultContainer = document.getElementById('breakdown-result');
  
  if (!input || !resultContainer) {
    console.error('Breakdown elements not found');
    return;
  }
  
  // Only proceed if planner tab is active
  const plannerTab = document.getElementById('planner');
  if (!plannerTab || !plannerTab.classList.contains('active')) {
    console.log('Breakdown task called but planner tab is not active');
    return;
  }
  
  const taskText = input.value.trim();

  if (!taskText) {
    alert('Please enter a task to break down!');
    return;
  }

  // Show loading state
  resultContainer.innerHTML = `
    <h4><i class="fa-solid fa-spinner fa-spin"></i> Breaking down task...</h4>
  `;
  resultContainer.classList.remove('hidden');

  // Simulate AI processing delay
  setTimeout(() => {
    const breakdown = appData.taskBreakdownExamples[taskText] || [
      `Break down "${taskText}" into smaller parts`,
      `Research and gather necessary materials`,
      `Create a timeline for completion`,
      `Execute the main components`,
      `Review and finalize the work`
    ];
    
    resultContainer.innerHTML = `
      <h4><i class="fa-solid fa-magic-wand-sparkles"></i> Task Breakdown for: "${taskText}"</h4>
      <ul class="breakdown-list">
        ${breakdown.map((step, index) => `
          <li>
            <span><strong>${index + 1}.</strong> ${step}</span>
            <button class="btn btn--sm btn--secondary" onclick="addSubtaskFromBreakdown('${step.replace(/'/g, "\\'")}')">
              <i class="fa-solid fa-plus"></i> Add as Task
            </button>
          </li>
        `).join('')}
      </ul>
    `;
    
    input.value = '';
  }, 1000);
}

function addSubtaskFromBreakdown(subtask) {
  const newTask = {
    id: Date.now(),
    title: subtask,
    category: 'Work',
    estimatedTime: 30,
    priority: 2,
    completed: false,
    day: getCurrentDay()
  };
  
  appData.tasks.push(newTask);
  renderTaskPlanner();
  renderDashboard();
  
  // Show success feedback
  showQuickActionFeedback(`Task "${subtask.substring(0, 30)}..." added successfully!`);
  
  // Update the button to show it was added
  event.target.innerHTML = '<i class="fa-solid fa-check"></i> Added';
  event.target.disabled = true;
  event.target.style.background = 'var(--success)';
  event.target.style.color = 'white';
}

function getCurrentDay() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  return days[today];
}

function toggleTaskFromCalendar(taskId) {
  toggleTask(taskId);
  // Re-render calendar to show updated state only if planner tab is active
  const plannerTab = document.getElementById('planner');
  if (plannerTab && plannerTab.classList.contains('active')) {
    renderWeeklyCalendar();
  }
}

// Focus Timer Functions
function selectFocusTask(taskId) {
  document.querySelectorAll('#focus-task-list .task-item').forEach(item => {
    item.classList.remove('selected');
  });
  
  const taskElement = document.querySelector(`#focus-task-list [data-task-id="${taskId}"]`);
  if (taskElement) {
    taskElement.classList.add('selected');
  }
  
  const task = appData.tasks.find(t => t.id === taskId);
  if (task) {
    timerState.currentTask = task;
    const focusTaskName = document.getElementById('focus-task-name');
    const currentFocusTask = document.getElementById('current-focus-task');
    
    if (focusTaskName) {
      focusTaskName.textContent = task.title;
    }
    if (currentFocusTask) {
      currentFocusTask.textContent = task.title;
    }
  }
}

function startTimer() {
  if (!timerState.currentTask) {
    alert('Please select a task to focus on first!');
    return;
  }

  timerState.isRunning = true;
  timerState.isPaused = false;
  
  const startBtn = document.getElementById('timer-start');
  const pauseBtn = document.getElementById('timer-pause');
  
  if (startBtn) startBtn.classList.add('hidden');
  if (pauseBtn) pauseBtn.classList.remove('hidden');

  timerState.intervalId = setInterval(() => {
    timerState.timeLeft--;
    updateTimerDisplay();
    updateProgressRing();

    if (timerState.timeLeft <= 0) {
      completePomodoro();
    }
  }, 1000);
}

function pauseTimer() {
  timerState.isRunning = false;
  timerState.isPaused = true;
  
  clearInterval(timerState.intervalId);
  
  const startBtn = document.getElementById('timer-start');
  const pauseBtn = document.getElementById('timer-pause');
  
  if (startBtn) startBtn.classList.remove('hidden');
  if (pauseBtn) pauseBtn.classList.add('hidden');
}

function resetTimer() {
  timerState.isRunning = false;
  timerState.isPaused = false;
  timerState.timeLeft = timerState.totalTime;
  
  clearInterval(timerState.intervalId);
  
  const startBtn = document.getElementById('timer-start');
  const pauseBtn = document.getElementById('timer-pause');
  
  if (startBtn) startBtn.classList.remove('hidden');
  if (pauseBtn) pauseBtn.classList.add('hidden');
  
  updateTimerDisplay();
  updateProgressRing();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerState.timeLeft / 60);
  const seconds = timerState.timeLeft % 60;
  
  const minutesElement = document.getElementById('timer-minutes');
  const secondsElement = document.getElementById('timer-seconds');
  
  if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
  if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
}

function updateProgressRing() {
  const progress = (timerState.totalTime - timerState.timeLeft) / timerState.totalTime;
  const circumference = 2 * Math.PI * 90;
  const offset = circumference * (1 - progress);
  
  const progressCircle = document.getElementById('progress-circle');
  if (progressCircle) {
    progressCircle.style.strokeDashoffset = offset;
  }
}

function completePomodoro() {
  resetTimer();
  
  // Update user statistics
  appData.user.focusSessionsToday++;
  appData.user.points += 25;
  
  // Update weekly progress data
  const today = new Date().getDay();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayData = appData.weeklyProgress.find(d => d.day === dayNames[today]);
  if (todayData) {
    todayData.focusHours += 0.42; // 25 minutes = ~0.42 hours
  }
  
  // Check for focus-related achievements
  checkFocusAchievements();
  
  // Update all relevant displays
  updateUserStats();
  renderDashboard();
  updateSessionInfo();
  
  // Show enhanced celebration
  showPomodoroCompletionCelebration();
  
  // Show break suggestion
  setTimeout(() => {
    showBreakSuggestions();
  }, 2000);
}

function checkFocusAchievements() {
  const focusSessionsToday = appData.user.focusSessionsToday;
  
  // Check for "Focus Ninja" achievement (5 pomodoros in one day)
  const focusNinja = appData.achievements.find(a => a.name === "Focus Ninja");
  if (focusNinja && !focusNinja.earned && focusSessionsToday >= 5) {
    focusNinja.earned = true;
    showAchievementUnlocked(focusNinja);
  }
}

function showPomodoroCompletionCelebration() {
  // Create pomodoro completion celebration
  let pomodoroOverlay = document.getElementById('pomodoro-celebration');
  if (!pomodoroOverlay) {
    pomodoroOverlay = document.createElement('div');
    pomodoroOverlay.id = 'pomodoro-celebration';
    pomodoroOverlay.className = 'celebration-overlay';
    document.body.appendChild(pomodoroOverlay);
  }
  
  const taskName = timerState.currentTask ? timerState.currentTask.title : 'Focus Session';
  
  pomodoroOverlay.innerHTML = `
    <div class="celebration-content">
      <div class="celebration-icon">
        <i class="fa-solid fa-clock"></i>
      </div>
      <div class="celebration-text">
        <h3>Pomodoro Complete!</h3>
        <p>"${taskName}"</p>
        <div class="points-awarded">+25 Focus Points</div>
        <div class="session-count">Session ${appData.user.focusSessionsToday} today</div>
      </div>
    </div>
  `;
  
  pomodoroOverlay.classList.add('show');
  
  setTimeout(() => {
    pomodoroOverlay.classList.remove('show');
  }, 3000);
}

// Brain Dump Functions
function saveBrainDump() {
  const textInput = document.getElementById('brain-dump-text');
  const tagsInput = document.getElementById('thought-tags');
  
  if (!textInput || !tagsInput) return;
  
  const text = textInput.value.trim();
  const tagsValue = tagsInput.value.trim();
  
  if (!text) {
    alert('Please enter some text before saving!');
    return;
  }
  
  const tags = tagsValue.split(' ').map(tag => tag.replace('#', '')).filter(tag => tag);
  
  const newEntry = {
    id: Date.now(),
    text: text,
    timestamp: new Date().toISOString(),
    tags: tags
  };
  
  appData.brainDumpEntries.unshift(newEntry);
  
  textInput.value = '';
  tagsInput.value = '';
  
  renderBrainDumpEntries();
  showCelebration();
}

function convertToTask(text) {
  const newTask = {
    id: Date.now(),
    title: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
    category: 'Personal',
    estimatedTime: 30,
    priority: 2,
    completed: false,
    day: 'Monday'
  };
  
  appData.tasks.push(newTask);
  renderTaskPlanner();
  renderDashboard();
  showCelebration();
  alert('Converted to task successfully!');
}

function deleteEntry(entryId) {
  appData.brainDumpEntries = appData.brainDumpEntries.filter(entry => entry.id !== entryId);
  renderBrainDumpEntries();
}

// Modal Functions
function showAddTaskModal() {
  const modal = document.getElementById('add-task-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('show');
    
    // Set default day to current day
    const currentDay = getCurrentDay();
    const daySelect = document.getElementById('task-day');
    if (daySelect) {
      daySelect.value = currentDay;
    }
  }
}

function closeAddTaskModal() {
  const modal = document.getElementById('add-task-modal');
  const form = document.getElementById('add-task-form');
  
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }
  if (form) form.reset();
}

function addNewTask(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  const newTask = {
    id: Date.now(),
    title: formData.get('title').trim(),
    category: formData.get('category'),
    estimatedTime: parseInt(formData.get('estimatedTime')),
    priority: parseInt(formData.get('priority')),
    completed: false,
    day: formData.get('day')
  };
  
  if (!newTask.title) {
    alert('Please enter a task title!');
    return;
  }
  
  appData.tasks.push(newTask);
  
  // Update all relevant displays
  renderTaskPlanner();
  renderDashboard();
  renderFocusTimer();
  
  // Close modal and show success
  closeAddTaskModal();
  showQuickActionFeedback(`Task "${newTask.title}" added successfully!`);
  
  // Award points for task creation
  appData.user.points += 5;
  updateUserStats();
}

function editTask(taskId) {
  const task = appData.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  // Pre-fill the modal with task data
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-category').value = task.category;
  document.getElementById('task-day').value = task.day;
  document.getElementById('task-time').value = task.estimatedTime;
  document.getElementById('task-priority').value = task.priority;
  
  // Change form submission to update instead of create
  const form = document.getElementById('add-task-form');
  form.onsubmit = function(event) {
    event.preventDefault();
    updateTask(taskId, event);
  };
  
  // Update modal title
  const modalTitle = document.querySelector('.modal-header h3');
  modalTitle.innerHTML = '<i class="fa-solid fa-edit"></i> Edit Task';
  
  // Update submit button
  const submitBtn = document.querySelector('.modal-actions .btn-primary');
  submitBtn.innerHTML = '<i class="fa-solid fa-save"></i> Update Task';
  
  showAddTaskModal();
}

function updateTask(taskId, event) {
  const form = event.target;
  const formData = new FormData(form);
  
  const task = appData.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  const title = formData.get('title').trim();
  if (!title) {
    alert('Please enter a task title!');
    return;
  }
  
  // Update task properties
  task.title = title;
  task.category = formData.get('category');
  task.estimatedTime = parseInt(formData.get('estimatedTime'));
  task.priority = parseInt(formData.get('priority'));
  task.day = formData.get('day');
  
  // Update all relevant displays
  renderTaskPlanner();
  renderDashboard();
  renderFocusTimer();
  
  // Reset form back to add mode
  resetAddTaskForm();
  
  closeAddTaskModal();
  showQuickActionFeedback(`Task "${task.title}" updated successfully!`);
}

function deleteTask(taskId) {
  const task = appData.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
    appData.tasks = appData.tasks.filter(t => t.id !== taskId);
    
    // Update all relevant displays
    renderTaskPlanner();
    renderDashboard();
    renderFocusTimer();
    
    showQuickActionFeedback(`Task "${task.title}" deleted successfully!`);
  }
}

function resetAddTaskForm() {
  const form = document.getElementById('add-task-form');
  form.onsubmit = addNewTask;
  
  const modalTitle = document.querySelector('.modal-header h3');
  modalTitle.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Add New Task';
  
  const submitBtn = document.querySelector('.modal-actions .btn-primary');
  submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Task';
}

// Progress Tracking Functions
function renderProgressChart() {
  const chartCanvas = document.getElementById('weekly-chart');
  if (!chartCanvas) {
    console.error('Chart canvas not found');
    return;
  }

  // Destroy existing chart if it exists
  if (weeklyChart) {
    weeklyChart.destroy();
  }

  const ctx = chartCanvas.getContext('2d');
  
  // Prepare data from appData.weeklyProgress
  const labels = appData.weeklyProgress.map(day => day.day);
  const tasksData = appData.weeklyProgress.map(day => day.tasksCompleted);
  const focusData = appData.weeklyProgress.map(day => day.focusHours);

  weeklyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Tasks Completed',
          data: tasksData,
          backgroundColor: 'rgba(144, 19, 254, 0.7)',
          borderColor: 'var(--primary-purple)',
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'Focus Hours',
          data: focusData,
          backgroundColor: 'rgba(74, 144, 226, 0.7)',
          borderColor: 'var(--primary-blue)',
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Weekly Productivity Overview',
          font: {
            size: 16,
            weight: 'bold'
          },
          color: 'var(--text-dark)'
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
              weight: '600'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'var(--primary-purple)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label;
              const value = context.parsed.y;
              if (label === 'Focus Hours') {
                return `${label}: ${value.toFixed(1)}h`;
              }
              return `${label}: ${value}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              weight: '600'
            },
            color: 'var(--dark-gray)'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Tasks Completed',
            font: {
              weight: '600'
            },
            color: 'var(--primary-purple)'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            color: 'var(--dark-gray)'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: 'Focus Hours',
            font: {
              weight: '600'
            },
            color: 'var(--primary-blue)'
          },
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            beginAtZero: true,
            stepSize: 0.5,
            color: 'var(--dark-gray)',
            callback: function(value) {
              return value.toFixed(1) + 'h';
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  });
}

function renderTrendsChart() {
  const chartCanvas = document.getElementById('trends-chart');
  if (!chartCanvas) {
    console.error('Trends chart canvas not found');
    return;
  }

  // Destroy existing chart if it exists
  if (trendsChart) {
    trendsChart.destroy();
  }

  const ctx = chartCanvas.getContext('2d');
  
  // Prepare data from appData.weeklyProgress
  const labels = appData.weeklyProgress.map(day => day.day);
  const efficiencyData = appData.weeklyProgress.map(day => 
    day.focusHours > 0 ? parseFloat((day.tasksCompleted / day.focusHours).toFixed(1)) : 0
  );
  const cumulativeTasksData = appData.weeklyProgress.reduce((acc, day, index) => {
    const cumulative = index === 0 ? day.tasksCompleted : acc[index - 1] + day.tasksCompleted;
    acc.push(cumulative);
    return acc;
  }, []);
  const cumulativeFocusData = appData.weeklyProgress.reduce((acc, day, index) => {
    const cumulative = index === 0 ? day.focusHours : acc[index - 1] + day.focusHours;
    acc.push(parseFloat(cumulative.toFixed(1)));
    return acc;
  }, []);

  console.log('Trends Chart Data:', { labels, efficiencyData, cumulativeTasksData, cumulativeFocusData });

  trendsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Focus Efficiency (Tasks/Hour)',
          data: efficiencyData,
          borderColor: 'var(--primary-green)',
          backgroundColor: 'rgba(126, 211, 33, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'var(--primary-green)',
          pointBorderColor: 'white',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          yAxisID: 'y'
        },
        {
          label: 'Cumulative Tasks',
          data: cumulativeTasksData,
          borderColor: 'var(--primary-purple)',
          backgroundColor: 'rgba(144, 19, 254, 0.1)',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: 'var(--primary-purple)',
          pointBorderColor: 'white',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          yAxisID: 'y1'
        },
        {
          label: 'Cumulative Focus Hours',
          data: cumulativeFocusData,
          borderColor: 'var(--primary-orange)',
          backgroundColor: 'rgba(245, 166, 35, 0.1)',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: 'var(--primary-orange)',
          pointBorderColor: 'white',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          yAxisID: 'y2'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Productivity Trends & Efficiency',
          font: {
            size: 16,
            weight: 'bold'
          },
          color: 'var(--text-dark)'
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            color: 'var(--text-dark)',
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: 'var(--text-dark)',
          bodyColor: 'var(--text-dark)',
          borderColor: 'var(--medium-gray)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.dataset.label === 'Focus Efficiency (Tasks/Hour)') {
                label += context.parsed.y + ' tasks/hour';
              } else if (context.dataset.label === 'Cumulative Focus Hours') {
                label += context.parsed.y + ' hours';
              } else {
                label += context.parsed.y + ' tasks';
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: true,
            color: 'rgba(0,0,0,0.05)'
          },
          ticks: {
            color: 'var(--dark-gray)',
            font: {
              size: 11
            }
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Efficiency (Tasks/Hour)',
            color: 'var(--primary-green)',
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          grid: {
            drawOnChartArea: true,
            color: 'rgba(0,0,0,0.05)'
          },
          ticks: {
            beginAtZero: true,
            color: 'var(--primary-green)',
            callback: function(value) {
              return value.toFixed(1);
            }
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: 'Cumulative Tasks',
            color: 'var(--primary-purple)',
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            beginAtZero: true,
            color: 'var(--primary-purple)'
          }
        },
        y2: {
          type: 'linear',
          display: false,
          position: 'right',
          ticks: {
            beginAtZero: true
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      animation: {
        duration: 1200,
        easing: 'easeInOutQuart'
      }
    }
  });
}

function renderAchievementShowcase() {
  const showcaseContainer = document.getElementById('achievement-showcase');
  if (!showcaseContainer) {
    console.error('Achievement showcase container not found');
    return;
  }

  // Map emoji icons to FontAwesome icons
  const iconMap = {
    '🌅': '<i class="fa-solid fa-dove"></i>',
    '🥷': '<i class="fa-solid fa-user-ninja"></i>',
    '🔥': '<i class="fa-solid fa-fire"></i>',
    '💪': '<i class="fa-solid fa-hand-back-fist"></i>'
  };

  const achievementsHTML = appData.achievements.map(achievement => {
    const iconHTML = iconMap[achievement.icon] || achievement.icon;
    const earnedClass = achievement.earned ? 'earned' : 'locked';
    
    return `
      <div class="achievement ${earnedClass}" title="${achievement.description}">
        <div class="achievement-icon">
          ${iconHTML}
        </div>
        <div class="achievement-name">${achievement.name}</div>
        ${achievement.earned ? 
          '<div class="achievement-status"><i class="fa-solid fa-check-circle"></i></div>' : 
          '<div class="achievement-status"><i class="fa-solid fa-lock"></i></div>'
        }
      </div>
    `;
  }).join('');

  showcaseContainer.innerHTML = achievementsHTML;
}

function renderFocusAnalytics() {
  const analyticsContainer = document.getElementById('focus-analytics');
  if (!analyticsContainer) {
    console.error('Focus analytics container not found');
    return;
  }

  // Calculate focus analytics data
  const totalFocusHours = appData.weeklyProgress.reduce((sum, day) => sum + day.focusHours, 0);
  const avgFocusPerDay = (totalFocusHours / 7).toFixed(1);
  const totalTasks = appData.weeklyProgress.reduce((sum, day) => sum + day.tasksCompleted, 0);
  const avgTasksPerDay = (totalTasks / 7).toFixed(1);
  const bestFocusDay = appData.weeklyProgress.reduce((best, day) => 
    day.focusHours > best.focusHours ? day : best
  );
  const mostProductiveDay = appData.weeklyProgress.reduce((best, day) => 
    day.tasksCompleted > best.tasksCompleted ? day : best
  );

  // Calculate focus efficiency (tasks per hour)
  const focusEfficiency = totalFocusHours > 0 ? (totalTasks / totalFocusHours).toFixed(1) : '0';

  const analyticsHTML = `
    <div class="analytics-grid">
      <div class="analytics-card">
        <div class="analytics-icon">
          <i class="fa-solid fa-clock"></i>
        </div>
        <div class="analytics-content">
          <div class="analytics-number">${totalFocusHours.toFixed(1)}h</div>
          <div class="analytics-label">Total Focus Time</div>
          <div class="analytics-sublabel">${avgFocusPerDay}h avg/day</div>
        </div>
      </div>
      
      <div class="analytics-card">
        <div class="analytics-icon">
          <i class="fa-solid fa-bullseye"></i>
        </div>
        <div class="analytics-content">
          <div class="analytics-number">${focusEfficiency}</div>
          <div class="analytics-label">Focus Efficiency</div>
          <div class="analytics-sublabel">tasks per hour</div>
        </div>
      </div>
      
      <div class="analytics-card">
        <div class="analytics-icon best-focus-icon">
          <i class="fa-solid fa-brain"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="analytics-content">
          <div class="analytics-number">${bestFocusDay.day}</div>
          <div class="analytics-label">Best Focus Day</div>
          <div class="analytics-sublabel">${bestFocusDay.focusHours}h focused</div>
        </div>
      </div>
      
      <div class="analytics-card">
        <div class="analytics-icon">
          <i class="fa-solid fa-trophy"></i>
        </div>
        <div class="analytics-content">
          <div class="analytics-number">${mostProductiveDay.day}</div>
          <div class="analytics-label">Most Productive</div>
          <div class="analytics-sublabel">${mostProductiveDay.tasksCompleted} tasks</div>
        </div>
      </div>
    </div>
    
    <div class="focus-insights">
      <div class="insight-item">
        <i class="fa-solid fa-lightbulb"></i>
        <span>Your peak focus time averages ${avgFocusPerDay} hours per day</span>
      </div>
      <div class="insight-item">
        <i class="fa-solid fa-chart-line"></i>
        <span>You complete ${avgTasksPerDay} tasks on average daily</span>
      </div>
      <div class="insight-item">
        <i class="fa-solid fa-star"></i>
        <span>${bestFocusDay.day} is your strongest focus day with ${bestFocusDay.focusHours}h</span>
      </div>
    </div>
  `;

  analyticsContainer.innerHTML = analyticsHTML;
}

// Render Functionss
function renderDashboard() {
  renderPriorityTasks();
  renderAchievements();
  renderDashboardStats();
  updateDateTime();
}

function renderPriorityTasks() {
  const container = document.getElementById('priority-tasks');
  if (!container) return;
  
  // Get today's high priority tasks (priority 3 and 2), showing both completed and incomplete
  const todayTasks = appData.tasks.filter(task => 
    task.day === 'Monday' && task.priority >= 2
  ).slice(0, 4);

  container.innerHTML = todayTasks.map(task => {
    const priorityClass = task.priority === 3 ? 'priority-high' : 
                         task.priority === 2 ? 'priority-medium' : 'priority-low';
    
    return `
      <div class="task-item ${priorityClass} ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
        <input type="checkbox" id="task${task.id}" class="task-checkbox" 
               ${task.completed ? 'checked' : ''} 
               onchange="toggleTask(${task.id})">
        <label for="task${task.id}" class="${task.completed ? 'completed-task' : ''}">${task.title}</label>
        <span class="task-time"><i class="fa-solid fa-clock"></i> ${task.estimatedTime}min</span>
      </div>
    `;
  }).join('');
}

function renderAchievements() {
  const container = document.getElementById('achievements-display');
  if (!container) return;
  
  // Map emoji icons to FontAwesome icons
  const iconMap = {
    '🌅': '<i class="fa-solid fa-dove"></i>',
    '🥷': '<i class="fa-solid fa-user-ninja"></i>',
    '🔥': '<i class="fa-solid fa-fire"></i>',
    '💪': '<i class="fa-solid fa-hand-back-fist"></i>'
  };
  
  // Show only recent earned achievements for Dashboard (max 4)
  const recentAchievements = appData.achievements.slice(0, 4);
  
  container.innerHTML = recentAchievements.map(achievement => `
    <div class="achievement ${achievement.earned ? 'earned' : 'locked'}">
      <span class="achievement-icon">${iconMap[achievement.icon] || achievement.icon}</span>
      <span class="achievement-name">${achievement.name}</span>
    </div>
  `).join('');
}

function renderDashboardStats() {
  // Update today's stats with real-time data
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length >= 3) {
    // Tasks completed today
    statNumbers[0].textContent = appData.user.tasksCompletedToday;
    
    // Focus sessions today
    statNumbers[1].textContent = appData.user.focusSessionsToday;
    
    // Calculate focus time from focus sessions (assuming 25 min per session)
    const focusHours = (appData.user.focusSessionsToday * 25 / 60).toFixed(1);
    statNumbers[2].textContent = `${focusHours}h`;
  }
  
  // Update stat items with animations for changes
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(item => {
    item.classList.add('stat-updated');
    setTimeout(() => {
      item.classList.remove('stat-updated');
    }, 500);
  });
}

function updateDateTime() {
  const now = new Date();
  
  // Update time (12-hour format with AM/PM)
  const timeOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  const timeString = now.toLocaleTimeString('en-US', timeOptions);
  
  // Update date (Day, Month Date)
  const dateOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  };
  const dateString = now.toLocaleDateString('en-US', dateOptions);
  
  // Update DOM elements
  const timeElement = document.getElementById('current-time');
  const dateElement = document.getElementById('current-date');
  
  if (timeElement) {
    timeElement.textContent = timeString;
  }
  
  if (dateElement) {
    dateElement.textContent = dateString;
  }
}

function renderTaskPlanner() {
  // Only render weekly calendar if planner tab is active
  const plannerTab = document.getElementById('planner');
  if (plannerTab && plannerTab.classList.contains('active')) {
    renderWeeklyCalendar();
  }
  renderAllTasks();
  setupTaskFilters();
}

function renderWeeklyCalendar() {
  const container = document.getElementById('weekly-calendar');
  if (!container) return;
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentDay = getCurrentDay();
  
  container.innerHTML = days.map(day => {
    const dayTasks = appData.tasks.filter(task => task.day === day);
    const isCurrentDay = day === currentDay;
    
    return `
      <div class="calendar-day ${isCurrentDay ? 'current-day' : ''}">
        <div class="day-header">
          ${day}
          ${isCurrentDay ? '<i class="fa-solid fa-circle" style="font-size: 6px; color: var(--primary-purple); margin-left: 5px;"></i>' : ''}
        </div>
        <div class="day-tasks">
          ${dayTasks.length === 0 ? 
            '<div class="no-tasks"><i class="fa-solid fa-calendar-plus"></i> No tasks</div>' :
            dayTasks.map(task => `
              <div class="calendar-task category-${task.category} ${task.completed ? 'completed' : ''}" 
                   onclick="toggleTaskFromCalendar(${task.id})" 
                   title="${task.title} (${task.estimatedTime} min)">
                <div class="task-title-calendar">${task.title}</div>
                <div class="task-meta-calendar">
                  <span class="task-time"><i class="fa-solid fa-clock"></i> ${task.estimatedTime}min</span>
                  <span class="task-priority">${'★'.repeat(task.priority)}</span>
                </div>
              </div>
            `).join('')
          }
        </div>
      </div>
    `;
  }).join('');
}

function renderAllTasks() {
  const container = document.getElementById('all-tasks');
  if (!container) return;
  
  // Show all tasks (completed and incomplete) for better task management
  const allTasks = appData.tasks.slice().sort((a, b) => {
    // Sort by completion status (incomplete first), then by priority (high first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.priority - a.priority;
  });

  if (allTasks.length === 0) {
    container.innerHTML = `
      <div class="no-tasks-message">
        <i class="fa-solid fa-clipboard-list"></i>
        <h4>No tasks yet</h4>
        <p>Click "Add New Task" to get started!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = allTasks.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
      <input type="checkbox" class="task-checkbox" 
             ${task.completed ? 'checked' : ''} 
             onchange="toggleTaskWithCelebration(${task.id})">
      <div class="task-content">
        <div class="task-title ${task.completed ? 'completed-task' : ''}">${task.title}</div>
        <div class="task-meta">
          <span class="task-category category-${task.category}">${task.category}</span>
          <span><i class="fa-solid fa-clock"></i> ${task.estimatedTime} min</span>
          <span class="priority-stars">${'★'.repeat(task.priority)}</span>
          <span><i class="fa-solid fa-calendar"></i> ${task.day}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="task-action-btn edit-btn" onclick="editTask(${task.id})" title="Edit task">
          <i class="fa-solid fa-edit"></i>
        </button>
        <button class="task-action-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete task">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function toggleTaskWithCelebration(taskId) {
  const task = appData.tasks.find(t => t.id === taskId);
  const wasCompleted = task ? task.completed : false;
  
  toggleTask(taskId);
  
  // Re-render task list to show updated state
  renderAllTasks();
  
  // Show celebration if task was just completed
  if (task && !wasCompleted && task.completed) {
    // Small delay to let the UI update
    setTimeout(() => {
      const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
      if (taskElement) {
        taskElement.style.animation = 'taskComplete 0.6s ease-in-out';
      }
    }, 100);
  }
}

function setupTaskFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.dataset.category;
      filterTasks(category);
    });
  });
}

function filterTasks(category) {
  const container = document.getElementById('all-tasks');
  if (!container) return;
  
  let filteredTasks = appData.tasks.slice();
  
  if (category !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.category === category);
  }
  
  // Sort filtered tasks
  filteredTasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.priority - a.priority;
  });

  if (filteredTasks.length === 0) {
    const categoryName = category === 'all' ? 'tasks' : `${category} tasks`;
    container.innerHTML = `
      <div class="no-tasks-message">
        <i class="fa-solid fa-clipboard-list"></i>
        <h4>No ${categoryName} found</h4>
        <p>Try a different filter or add some tasks!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredTasks.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
      <input type="checkbox" class="task-checkbox" 
             ${task.completed ? 'checked' : ''} 
             onchange="toggleTaskWithCelebration(${task.id})">
      <div class="task-content">
        <div class="task-title ${task.completed ? 'completed-task' : ''}">${task.title}</div>
        <div class="task-meta">
          <span class="task-category category-${task.category}">${task.category}</span>
          <span><i class="fa-solid fa-clock"></i> ${task.estimatedTime} min</span>
          <span class="priority-stars">${'★'.repeat(task.priority)}</span>
          <span><i class="fa-solid fa-calendar"></i> ${task.day}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="task-action-btn edit-btn" onclick="editTask(${task.id})" title="Edit task">
          <i class="fa-solid fa-edit"></i>
        </button>
        <button class="task-action-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete task">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function renderFocusTimer() {
  renderFocusTaskList();
  updateTimerDisplay();
  updateSessionInfo();
}

function updateSessionInfo() {
  const pomodoroCount = document.getElementById('pomodoro-count');
  const currentFocusTask = document.getElementById('current-focus-task');
  
  if (pomodoroCount) {
    pomodoroCount.textContent = appData.user.focusSessionsToday;
  }
  
  if (currentFocusTask) {
    currentFocusTask.textContent = timerState.currentTask ? timerState.currentTask.title : 'No task selected';
  }
}

function renderFocusTaskList() {
  const container = document.getElementById('focus-task-list');
  if (!container) return;
  
  const activeTasks = appData.tasks.filter(task => !task.completed);

  container.innerHTML = activeTasks.map(task => `
    <div class="task-item" data-task-id="${task.id}" onclick="selectFocusTask(${task.id})">
      <div class="task-content">
        <div class="task-title">${task.title}</div>
        <div class="task-meta">
          <span class="task-category category-${task.category}">${task.category}</span>
          <span>${task.estimatedTime} min</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderProgressTracker() {
  renderProgressChart();
  renderTrendsChart();
  renderAchievementShowcase();
  renderFocusAnalytics();
}

function renderBrainDump() {
  renderBrainDumpEntries();
  setupBrainDumpSearch();
}

function renderBrainDumpEntries() {
  const container = document.getElementById('brain-dump-entries');
  if (!container) return;
  
  container.innerHTML = appData.brainDumpEntries.map(entry => `
    <div class="dump-entry">
      <div class="entry-text">${entry.text}</div>
      <div class="entry-meta">
        <div class="entry-tags">
          ${entry.tags.map(tag => `<span class="entry-tag">#${tag}</span>`).join('')}
        </div>
        <div class="entry-actions">
          <button class="entry-action-btn convert-btn" onclick="convertToTask('${entry.text.replace(/'/g, "\\'")}')">
            <i class="fa-solid fa-arrow-right"></i> Task
          </button>
          <button class="entry-action-btn delete-btn" onclick="deleteEntry(${entry.id})">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </div>
      <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 8px;">
        ${new Date(entry.timestamp).toLocaleDateString()} ${new Date(entry.timestamp).toLocaleTimeString()}
      </div>
    </div>
  `).join('');
}

function setupBrainDumpSearch() {
  const searchInput = document.getElementById('search-thoughts');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const entries = document.querySelectorAll('.dump-entry');
    
    entries.forEach(entry => {
      const textElement = entry.querySelector('.entry-text');
      if (textElement) {
        const text = textElement.textContent.toLowerCase();
        entry.style.display = text.includes(query) ? 'block' : 'none';
      }
    });
  });
}

// Healthcare Data Export Functions
function exportUserData() {
  console.log('Starting data export...');
  
  // Check browser compatibility first
  if (!checkBrowserCompatibility()) {
    showExportErrorFeedback('Your browser does not support data export. Please use a modern browser like Chrome, Firefox, or Safari.');
    return;
  }
  
  // Show loading indicator
  showExportLoadingIndicator();
  
  try {
    // Validate data integrity before export
    if (!validateDataIntegrity()) {
      throw new Error('Data validation failed. Some required data is missing or corrupted.');
    }
    
    // Aggregate all user data into structured export format
    const exportData = generateExportData();
    
    // Validate export data structure
    if (!exportData || typeof exportData !== 'object') {
      throw new Error('Failed to generate export data structure.');
    }
    
    // Generate downloadable JSON file
    downloadDataAsJSON(exportData);
    
    // Show success feedback
    showExportSuccessFeedback();
    
  } catch (error) {
    console.error('Export failed:', error);
    
    // Provide specific error messages based on error type
    let userFriendlyMessage = 'An unexpected error occurred while exporting your data.';
    
    if (error.name === 'QuotaExceededError') {
      userFriendlyMessage = 'Not enough storage space available. Please free up some space and try again.';
    } else if (error.name === 'SecurityError') {
      userFriendlyMessage = 'Security restrictions prevented the export. Please check your browser settings.';
    } else if (error.message.includes('validation')) {
      userFriendlyMessage = 'Data validation failed. Please refresh the page and try again.';
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      userFriendlyMessage = 'Network error occurred. Please check your connection and try again.';
    } else if (error.message.includes('permission')) {
      userFriendlyMessage = 'Permission denied. Please allow downloads in your browser settings.';
    }
    
    showExportErrorFeedback(userFriendlyMessage, error.message);
  }
}

function generateExportData() {
  // Calculate additional metrics
  const completedTasks = appData.tasks.filter(task => task.completed);
  const totalTasks = appData.tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks.length / totalTasks * 100).toFixed(1) : 0;
  
  // Calculate focus session statistics
  const totalFocusTime = appData.weeklyProgress.reduce((sum, day) => sum + day.focusHours, 0);
  const averageSessionLength = appData.user.focusSessionsToday > 0 ? (totalFocusTime / appData.user.focusSessionsToday * 60).toFixed(1) : 0;
  const sessionsPerDay = (appData.weeklyProgress.reduce((sum, day) => sum + (day.focusHours / 0.42), 0) / 7).toFixed(1);
  
  // Group tasks by category and priority
  const tasksByCategory = appData.tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});
  
  const tasksByPriority = appData.tasks.reduce((acc, task) => {
    const priority = task.priority === 3 ? 'High' : task.priority === 2 ? 'Medium' : 'Low';
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});
  
  // Group brain dump entries by tags
  const entriesByTag = appData.brainDumpEntries.reduce((acc, entry) => {
    entry.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
  
  // Calculate achievements completion rate
  const earnedAchievements = appData.achievements.filter(a => a.earned);
  const achievementCompletionRate = (earnedAchievements.length / appData.achievements.length * 100).toFixed(1);
  
  // Generate productivity insights
  const insights = generateProductivityInsights();
  
  // Create comprehensive export data structure
  const exportData = {
    exportMetadata: {
      exportDate: new Date().toISOString(),
      exportVersion: "1.0",
      applicationName: "FoFlow ADHD Coach"
    },
    userProfile: {
      name: appData.user.name,
      level: appData.user.level,
      levelTitle: appData.user.levelTitle,
      totalPoints: appData.user.points,
      currentStreak: appData.user.currentStreak,
      tasksCompletedToday: appData.user.tasksCompletedToday,
      focusSessionsToday: appData.user.focusSessionsToday
    },
    taskData: {
      totalTasks: totalTasks,
      completedTasks: completedTasks.length,
      completionRate: parseFloat(completionRate),
      tasksByCategory: tasksByCategory,
      tasksByPriority: tasksByPriority,
      tasks: appData.tasks.map(task => ({
        id: task.id,
        title: task.title,
        category: task.category,
        estimatedTime: task.estimatedTime,
        priority: task.priority,
        completed: task.completed,
        day: task.day,
        completedDate: task.completed ? new Date().toISOString() : null
      }))
    },
    focusData: {
      totalSessions: appData.weeklyProgress.reduce((sum, day) => sum + Math.round(day.focusHours / 0.42), 0),
      totalFocusTime: parseFloat(totalFocusTime.toFixed(2)),
      averageSessionLength: parseFloat(averageSessionLength),
      sessionsPerDay: parseFloat(sessionsPerDay),
      weeklyFocusHours: appData.weeklyProgress.map(day => ({
        day: day.day,
        focusHours: day.focusHours,
        tasksCompleted: day.tasksCompleted
      }))
    },
    brainDumpData: {
      totalEntries: appData.brainDumpEntries.length,
      entriesByTag: entriesByTag,
      entries: appData.brainDumpEntries.map(entry => ({
        id: entry.id,
        text: entry.text,
        timestamp: entry.timestamp,
        tags: entry.tags
      }))
    },
    achievements: {
      earned: earnedAchievements.map(a => ({
        name: a.name,
        description: a.description,
        icon: a.icon
      })),
      pending: appData.achievements.filter(a => !a.earned).map(a => ({
        name: a.name,
        description: a.description,
        icon: a.icon
      })),
      completionRate: parseFloat(achievementCompletionRate)
    },
    weeklyProgress: appData.weeklyProgress,
    insights: insights
  };
  
  return exportData;
}

function generateProductivityInsights() {
  // Calculate productivity trends
  const weeklyData = appData.weeklyProgress;
  const totalWeeklyTasks = weeklyData.reduce((sum, day) => sum + day.tasksCompleted, 0);
  const totalWeeklyFocus = weeklyData.reduce((sum, day) => sum + day.focusHours, 0);
  const averageTasksPerDay = (totalWeeklyTasks / 7).toFixed(1);
  const averageFocusPerDay = (totalWeeklyFocus / 7).toFixed(1);
  
  // Find peak performance times
  const peakPerformanceDays = weeklyData
    .sort((a, b) => (b.tasksCompleted + b.focusHours) - (a.tasksCompleted + a.focusHours))
    .slice(0, 3)
    .map(day => day.day);
  
  // Identify improvement areas
  const improvementAreas = [];
  if (appData.user.currentStreak < 7) {
    improvementAreas.push("Consistency - Work on maintaining daily streaks");
  }
  if (totalWeeklyFocus < 10) {
    improvementAreas.push("Focus Time - Consider increasing daily focus sessions");
  }
  if (appData.tasks.filter(t => !t.completed).length > 10) {
    improvementAreas.push("Task Management - Consider breaking down large tasks");
  }
  
  return {
    productivityTrends: {
      averageTasksPerDay: parseFloat(averageTasksPerDay),
      averageFocusPerDay: parseFloat(averageFocusPerDay),
      weeklyTaskTotal: totalWeeklyTasks,
      weeklyFocusTotal: parseFloat(totalWeeklyFocus.toFixed(2)),
      consistencyScore: Math.min(100, (appData.user.currentStreak / 7) * 100).toFixed(1)
    },
    peakPerformanceTimes: peakPerformanceDays,
    improvementAreas: improvementAreas,
    strengths: [
      `Strong ${appData.user.levelTitle} level achievement`,
      `${appData.user.currentStreak}-day consistency streak`,
      `${appData.achievements.filter(a => a.earned).length} achievements unlocked`
    ]
  };
}

function downloadDataAsJSON(data) {
  try {
    // Validate data before processing
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data provided for export');
    }
    
    // Create JSON string with proper formatting and error handling
    let jsonString;
    try {
      jsonString = JSON.stringify(data, null, 2);
    } catch (jsonError) {
      throw new Error('Failed to convert data to JSON format: ' + jsonError.message);
    }
    
    // Check if JSON string is too large (>50MB)
    const sizeInMB = new Blob([jsonString]).size / (1024 * 1024);
    if (sizeInMB > 50) {
      throw new Error('Export file is too large (' + sizeInMB.toFixed(1) + 'MB). Please contact support.');
    }
    
    // Create blob with error handling
    let blob;
    try {
      blob = new Blob([jsonString], { type: 'application/json' });
    } catch (blobError) {
      throw new Error('Failed to create download file: ' + blobError.message);
    }
    
    // Create URL with error handling
    let url;
    try {
      url = URL.createObjectURL(blob);
    } catch (urlError) {
      throw new Error('Failed to prepare download: ' + urlError.message);
    }
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `foflow-adhd-data-export-${timestamp}.json`;
    
    // Create and trigger download with error handling
    try {
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.style.display = 'none';
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up URL object
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
      
    } catch (downloadError) {
      URL.revokeObjectURL(url);
      throw new Error('Failed to initiate download: ' + downloadError.message);
    }
    
  } catch (error) {
    console.error('Download failed:', error);
    throw error; // Re-throw to be handled by calling function
  }
}

function showExportLoadingIndicator() {
  // Create or update loading notification
  let loadingNotification = document.getElementById('export-loading');
  if (!loadingNotification) {
    loadingNotification = document.createElement('div');
    loadingNotification.id = 'export-loading';
    loadingNotification.className = 'export-notification loading';
    document.body.appendChild(loadingNotification);
  }
  
  loadingNotification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        <i class="fa-solid fa-spinner fa-spin"></i>
      </div>
      <div class="notification-text">
        <h4>Exporting Data...</h4>
        <p>Preparing your comprehensive productivity report</p>
      </div>
    </div>
  `;
  
  loadingNotification.classList.add('show');
}

function showExportSuccessFeedback() {
  // Hide loading indicator
  const loadingNotification = document.getElementById('export-loading');
  if (loadingNotification) {
    loadingNotification.classList.remove('show');
  }
  
  // Create or update success notification
  let successNotification = document.getElementById('export-success');
  if (!successNotification) {
    successNotification = document.createElement('div');
    successNotification.id = 'export-success';
    successNotification.className = 'export-notification success';
    document.body.appendChild(successNotification);
  }
  
  successNotification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        <i class="fa-solid fa-check-circle"></i>
      </div>
      <div class="notification-text">
        <h4>Export Complete!</h4>
        <p>Your productivity data has been downloaded successfully</p>
      </div>
    </div>
  `;
  
  successNotification.classList.add('show');
  
  // Hide after 4 seconds
  setTimeout(() => {
    successNotification.classList.remove('show');
  }, 4000);
}

function showExportErrorFeedback(userMessage, technicalDetails = null) {
  // Hide loading indicator
  const loadingNotification = document.getElementById('export-loading');
  if (loadingNotification) {
    loadingNotification.classList.remove('show');
  }
  
  // Create or update error notification
  let errorNotification = document.getElementById('export-error');
  if (!errorNotification) {
    errorNotification = document.createElement('div');
    errorNotification.id = 'export-error';
    errorNotification.className = 'export-notification error';
    document.body.appendChild(errorNotification);
  }
  
  // Provide helpful troubleshooting suggestions
  const troubleshootingTips = getTroubleshootingTips(userMessage);
  
  errorNotification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        <i class="fa-solid fa-exclamation-triangle"></i>
      </div>
      <div class="notification-text">
        <h4>Export Failed</h4>
        <p>${userMessage || 'An error occurred while exporting your data. Please try again.'}</p>
        ${troubleshootingTips ? `<div class="troubleshooting-tips">
          <strong>Troubleshooting:</strong>
          <ul>${troubleshootingTips.map(tip => `<li>${tip}</li>`).join('')}</ul>
        </div>` : ''}
        <div class="error-actions">
          <button class="btn-secondary retry-btn" onclick="exportUserData()">
            <i class="fa-solid fa-retry"></i> Retry Export
          </button>
          ${technicalDetails ? `<button class="btn-secondary details-btn" onclick="showTechnicalDetails('${technicalDetails.replace(/'/g, "\\'")}')">
            <i class="fa-solid fa-info-circle"></i> Technical Details
          </button>` : ''}
        </div>
      </div>
    </div>
  `;
  
  errorNotification.classList.add('show');
  
  // Auto-hide after 10 seconds (longer for error messages)
  setTimeout(() => {
    errorNotification.classList.remove('show');
  }, 10000);
}

// Healthcare Report Generation System
function generateHealthcareReport(dateRange = null) {
  console.log('Generating healthcare report...');
  
  try {
    // Set default date range if not provided (last 30 days)
    const endDate = new Date();
    const startDate = dateRange ? new Date(dateRange.start) : new Date(endDate.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    // Calculate key productivity metrics
    const metrics = calculateHealthcareMetrics(startDate, endDate);
    
    // Analyze patterns and trends
    const patterns = analyzeProductivityPatterns();
    
    // Generate professional healthcare report
    const healthcareReport = {
      reportMetadata: {
        reportDate: new Date().toISOString(),
        dateRange: {
          start: startDate.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0],
          duration: `${Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} days`
        },
        patientName: appData.user.name,
        reportType: "ADHD Productivity Assessment"
      },
      
      executiveSummary: {
        overallProductivity: metrics.overallProductivityLevel,
        keyFindings: [
          `Task completion rate: ${metrics.taskCompletionRate}%`,
          `Average daily focus time: ${metrics.averageDailyFocusTime} hours`,
          `Consistency score: ${metrics.consistencyScore}%`,
          `Current productivity streak: ${appData.user.currentStreak} days`
        ],
        clinicalRelevance: generateClinicalRelevance(metrics)
      },
      
      keyMetrics: {
        taskManagement: {
          totalTasksAttempted: metrics.totalTasks,
          tasksCompleted: metrics.completedTasks,
          completionRate: metrics.taskCompletionRate,
          averageTaskDuration: metrics.averageTaskDuration,
          priorityDistribution: metrics.tasksByPriority
        },
        focusAndAttention: {
          totalFocusSessions: metrics.totalFocusSessions,
          totalFocusTime: metrics.totalFocusTime,
          averageSessionLength: metrics.averageSessionLength,
          focusConsistency: metrics.focusConsistency,
          dailyFocusPattern: metrics.dailyFocusPattern
        },
        cognitiveLoad: {
          brainDumpFrequency: metrics.brainDumpFrequency,
          thoughtOrganization: metrics.thoughtOrganization,
          mentalClarity: metrics.mentalClarityScore
        }
      },
      
      behavioralPatterns: {
        mostProductiveDays: patterns.peakPerformanceDays,
        productivityTrends: patterns.trends,
        consistencyPatterns: patterns.consistency,
        challengeAreas: patterns.challenges,
        strengthAreas: patterns.strengths
      },
      
      clinicalInsights: {
        adhdSymptomIndicators: generateADHDIndicators(metrics, patterns),
        functionalImprovements: identifyFunctionalImprovements(metrics),
        treatmentResponseIndicators: assessTreatmentResponse(metrics, patterns),
        recommendedInterventions: generateInterventionRecommendations(metrics, patterns)
      },
      
      progressTracking: {
        achievementsMilestones: {
          earned: appData.achievements.filter(a => a.earned).map(a => ({
            name: a.name,
            description: a.description,
            clinicalSignificance: mapAchievementToClinicalSignificance(a)
          })),
          completionRate: ((appData.achievements.filter(a => a.earned).length / appData.achievements.length) * 100).toFixed(1)
        },
        levelProgression: {
          currentLevel: appData.user.level,
          levelTitle: appData.user.levelTitle,
          totalPoints: appData.user.points,
          progressIndicator: calculateProgressIndicator()
        }
      }
    };
    
    return healthcareReport;
    
  } catch (error) {
    console.error('Healthcare report generation failed:', error);
    throw new Error('Failed to generate healthcare report: ' + error.message);
  }
}

function calculateHealthcareMetrics(startDate, endDate) {
  // Calculate comprehensive metrics for healthcare assessment
  const completedTasks = appData.tasks.filter(task => task.completed);
  const totalTasks = appData.tasks.length;
  const taskCompletionRate = totalTasks > 0 ? ((completedTasks.length / totalTasks) * 100).toFixed(1) : 0;
  
  // Focus session calculations
  const totalFocusTime = appData.weeklyProgress.reduce((sum, day) => sum + day.focusHours, 0);
  const totalFocusSessions = Math.round(totalFocusTime / 0.42); // 25-minute sessions
  const averageSessionLength = totalFocusSessions > 0 ? (totalFocusTime / totalFocusSessions * 60).toFixed(1) : 0;
  const averageDailyFocusTime = (totalFocusTime / 7).toFixed(2);
  
  // Task priority analysis
  const tasksByPriority = appData.tasks.reduce((acc, task) => {
    const priority = task.priority === 3 ? 'High' : task.priority === 2 ? 'Medium' : 'Low';
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});
  
  // Consistency scoring
  const consistencyScore = Math.min(100, (appData.user.currentStreak / 7) * 100).toFixed(1);
  
  // Focus consistency (variation in daily focus time)
  const focusVariation = calculateFocusVariation();
  const focusConsistency = Math.max(0, 100 - focusVariation).toFixed(1);
  
  // Brain dump analysis
  const brainDumpFrequency = (appData.brainDumpEntries.length / 7).toFixed(1); // per day
  const thoughtOrganization = calculateThoughtOrganization();
  
  // Overall productivity assessment
  const overallProductivityLevel = assessOverallProductivity(taskCompletionRate, consistencyScore, averageDailyFocusTime);
  
  return {
    totalTasks,
    completedTasks: completedTasks.length,
    taskCompletionRate: parseFloat(taskCompletionRate),
    averageTaskDuration: calculateAverageTaskDuration(),
    tasksByPriority,
    totalFocusSessions,
    totalFocusTime: parseFloat(totalFocusTime.toFixed(2)),
    averageSessionLength: parseFloat(averageSessionLength),
    averageDailyFocusTime: parseFloat(averageDailyFocusTime),
    focusConsistency: parseFloat(focusConsistency),
    dailyFocusPattern: appData.weeklyProgress.map(day => ({
      day: day.day,
      focusHours: day.focusHours,
      tasksCompleted: day.tasksCompleted
    })),
    consistencyScore: parseFloat(consistencyScore),
    brainDumpFrequency: parseFloat(brainDumpFrequency),
    thoughtOrganization,
    mentalClarityScore: calculateMentalClarityScore(),
    overallProductivityLevel
  };
}

function analyzeProductivityPatterns() {
  // Identify peak performance days
  const peakPerformanceDays = appData.weeklyProgress
    .sort((a, b) => (b.tasksCompleted + b.focusHours * 2) - (a.tasksCompleted + a.focusHours * 2))
    .slice(0, 3)
    .map(day => ({
      day: day.day,
      score: (day.tasksCompleted + day.focusHours * 2).toFixed(1),
      tasksCompleted: day.tasksCompleted,
      focusHours: day.focusHours
    }));
  
  // Analyze trends
  const weeklyData = appData.weeklyProgress;
  const firstHalf = weeklyData.slice(0, 3);
  const secondHalf = weeklyData.slice(4, 7);
  
  const firstHalfAvg = firstHalf.reduce((sum, day) => sum + day.tasksCompleted + day.focusHours, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, day) => sum + day.tasksCompleted + day.focusHours, 0) / secondHalf.length;
  
  const trendDirection = secondHalfAvg > firstHalfAvg ? 'improving' : secondHalfAvg < firstHalfAvg ? 'declining' : 'stable';
  const trendMagnitude = Math.abs(((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100).toFixed(1);
  
  // Consistency patterns
  const consistencyPatterns = analyzeConsistencyPatterns();
  
  // Challenge identification
  const challenges = identifyProductivityChallenges();
  
  // Strength identification
  const strengths = identifyProductivityStrengths();
  
  return {
    peakPerformanceDays,
    trends: {
      direction: trendDirection,
      magnitude: parseFloat(trendMagnitude),
      description: `Productivity is ${trendDirection} by ${trendMagnitude}% week-over-week`
    },
    consistency: consistencyPatterns,
    challenges,
    strengths
  };
}

function generateClinicalRelevance(metrics) {
  const relevanceNotes = [];
  
  if (metrics.taskCompletionRate >= 80) {
    relevanceNotes.push("High task completion rate suggests effective executive function and treatment response");
  } else if (metrics.taskCompletionRate >= 60) {
    relevanceNotes.push("Moderate task completion rate indicates partial executive function improvement");
  } else {
    relevanceNotes.push("Low task completion rate may indicate need for treatment adjustment or additional support");
  }
  
  if (metrics.focusConsistency >= 70) {
    relevanceNotes.push("Consistent focus patterns suggest improved attention regulation");
  } else {
    relevanceNotes.push("Variable focus patterns may indicate attention regulation challenges");
  }
  
  if (metrics.consistencyScore >= 80) {
    relevanceNotes.push("High consistency score demonstrates strong routine adherence and self-regulation");
  }
  
  return relevanceNotes;
}

function generateADHDIndicators(metrics, patterns) {
  const indicators = [];
  
  // Attention indicators
  if (metrics.averageSessionLength < 20) {
    indicators.push({
      category: "Attention",
      indicator: "Short focus sessions",
      value: `${metrics.averageSessionLength} minutes average`,
      clinicalNote: "May indicate sustained attention difficulties"
    });
  }
  
  // Executive function indicators
  if (metrics.taskCompletionRate < 70) {
    indicators.push({
      category: "Executive Function",
      indicator: "Task completion challenges",
      value: `${metrics.taskCompletionRate}% completion rate`,
      clinicalNote: "Suggests executive function support needs"
    });
  }
  
  // Working memory indicators
  if (metrics.brainDumpFrequency > 2) {
    indicators.push({
      category: "Working Memory",
      indicator: "High external memory usage",
      value: `${metrics.brainDumpFrequency} entries per day`,
      clinicalNote: "Indicates effective compensatory strategy use"
    });
  }
  
  // Hyperactivity/Impulsivity indicators
  if (patterns.consistency.variabilityScore > 50) {
    indicators.push({
      category: "Consistency",
      indicator: "High day-to-day variability",
      value: `${patterns.consistency.variabilityScore}% variability`,
      clinicalNote: "May reflect emotional regulation or motivation fluctuations"
    });
  }
  
  return indicators;
}

function identifyFunctionalImprovements(metrics) {
  const improvements = [];
  
  if (metrics.taskCompletionRate >= 70) {
    improvements.push("Effective task completion and follow-through");
  }
  
  if (metrics.averageDailyFocusTime >= 2) {
    improvements.push("Sustained attention for meaningful work periods");
  }
  
  if (metrics.consistencyScore >= 70) {
    improvements.push("Consistent daily routine and habit formation");
  }
  
  if (appData.achievements.filter(a => a.earned).length >= 3) {
    improvements.push("Achievement of meaningful productivity milestones");
  }
  
  return improvements;
}

function assessTreatmentResponse(metrics, patterns) {
  const responseIndicators = [];
  
  // Positive response indicators
  if (patterns.trends.direction === 'improving') {
    responseIndicators.push({
      type: "positive",
      indicator: "Improving productivity trend",
      significance: "Suggests positive treatment response"
    });
  }
  
  if (metrics.focusConsistency >= 70) {
    responseIndicators.push({
      type: "positive",
      indicator: "Consistent focus patterns",
      significance: "Indicates improved attention regulation"
    });
  }
  
  // Areas needing attention
  if (metrics.taskCompletionRate < 60) {
    responseIndicators.push({
      type: "concern",
      indicator: "Low task completion rate",
      significance: "May require treatment optimization"
    });
  }
  
  if (patterns.consistency.variabilityScore > 60) {
    responseIndicators.push({
      type: "concern",
      indicator: "High day-to-day variability",
      significance: "Consider mood or motivation factors"
    });
  }
  
  return responseIndicators;
}

function generateInterventionRecommendations(metrics, patterns) {
  const recommendations = [];
  
  // Focus-based recommendations
  if (metrics.averageSessionLength < 20) {
    recommendations.push({
      category: "Attention Training",
      recommendation: "Gradual focus session extension",
      rationale: "Build sustained attention capacity incrementally",
      implementation: "Increase session length by 2-3 minutes weekly"
    });
  }
  
  // Task management recommendations
  if (metrics.taskCompletionRate < 70) {
    recommendations.push({
      category: "Executive Function",
      recommendation: "Task breakdown and prioritization training",
      rationale: "Improve task initiation and completion",
      implementation: "Use built-in task breakdown feature for complex tasks"
    });
  }
  
  // Consistency recommendations
  if (metrics.consistencyScore < 60) {
    recommendations.push({
      category: "Routine Building",
      recommendation: "Structured daily routine implementation",
      rationale: "Improve consistency and reduce decision fatigue",
      implementation: "Establish fixed times for focus sessions and task review"
    });
  }
  
  // Cognitive load recommendations
  if (metrics.brainDumpFrequency < 1) {
    recommendations.push({
      category: "Cognitive Support",
      recommendation: "Increase external memory usage",
      rationale: "Reduce working memory burden",
      implementation: "Regular use of brain dump feature for thought capture"
    });
  }
  
  return recommendations;
}

// Helper functions for healthcare report calculations
function calculateFocusVariation() {
  const focusHours = appData.weeklyProgress.map(day => day.focusHours);
  const mean = focusHours.reduce((sum, hours) => sum + hours, 0) / focusHours.length;
  const variance = focusHours.reduce((sum, hours) => sum + Math.pow(hours - mean, 2), 0) / focusHours.length;
  const standardDeviation = Math.sqrt(variance);
  const coefficientOfVariation = mean > 0 ? (standardDeviation / mean) * 100 : 0;
  return coefficientOfVariation.toFixed(1);
}

function calculateThoughtOrganization() {
  const totalEntries = appData.brainDumpEntries.length;
  const taggedEntries = appData.brainDumpEntries.filter(entry => entry.tags.length > 0).length;
  const organizationScore = totalEntries > 0 ? (taggedEntries / totalEntries) * 100 : 0;
  return parseFloat(organizationScore.toFixed(1));
}

function calculateMentalClarityScore() {
  // Based on task completion rate, focus consistency, and thought organization
  const taskScore = (appData.tasks.filter(t => t.completed).length / appData.tasks.length) * 100;
  const focusScore = 100 - parseFloat(calculateFocusVariation());
  const organizationScore = calculateThoughtOrganization();
  
  const clarityScore = (taskScore + focusScore + organizationScore) / 3;
  return parseFloat(clarityScore.toFixed(1));
}

function calculateAverageTaskDuration() {
  const totalEstimatedTime = appData.tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
  return appData.tasks.length > 0 ? (totalEstimatedTime / appData.tasks.length).toFixed(1) : 0;
}

function assessOverallProductivity(completionRate, consistencyScore, dailyFocusTime) {
  const score = (parseFloat(completionRate) + parseFloat(consistencyScore) + (parseFloat(dailyFocusTime) * 10)) / 3;
  
  if (score >= 80) return "High";
  if (score >= 60) return "Moderate-High";
  if (score >= 40) return "Moderate";
  if (score >= 20) return "Low-Moderate";
  return "Low";
}

function analyzeConsistencyPatterns() {
  const dailyScores = appData.weeklyProgress.map(day => day.tasksCompleted + (day.focusHours * 2));
  const mean = dailyScores.reduce((sum, score) => sum + score, 0) / dailyScores.length;
  const variance = dailyScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / dailyScores.length;
  const variabilityScore = mean > 0 ? (Math.sqrt(variance) / mean) * 100 : 0;
  
  return {
    variabilityScore: parseFloat(variabilityScore.toFixed(1)),
    pattern: variabilityScore < 30 ? "Highly consistent" : variabilityScore < 50 ? "Moderately consistent" : "Variable",
    recommendation: variabilityScore > 50 ? "Focus on routine stabilization" : "Maintain current consistency"
  };
}

function identifyProductivityChallenges() {
  const challenges = [];
  
  if (appData.user.currentStreak < 3) {
    challenges.push("Maintaining daily consistency");
  }
  
  const incompleteTasks = appData.tasks.filter(t => !t.completed);
  if (incompleteTasks.length > appData.tasks.length * 0.5) {
    challenges.push("Task completion and follow-through");
  }
  
  const avgFocusTime = appData.weeklyProgress.reduce((sum, day) => sum + day.focusHours, 0) / 7;
  if (avgFocusTime < 1.5) {
    challenges.push("Sustained attention and focus duration");
  }
  
  if (appData.brainDumpEntries.length < 3) {
    challenges.push("Thought capture and external memory usage");
  }
  
  return challenges;
}

function identifyProductivityStrengths() {
  const strengths = [];
  
  if (appData.user.currentStreak >= 5) {
    strengths.push("Strong consistency and routine adherence");
  }
  
  const completionRate = (appData.tasks.filter(t => t.completed).length / appData.tasks.length) * 100;
  if (completionRate >= 70) {
    strengths.push("Effective task completion and execution");
  }
  
  const avgFocusTime = appData.weeklyProgress.reduce((sum, day) => sum + day.focusHours, 0) / 7;
  if (avgFocusTime >= 2) {
    strengths.push("Good sustained attention capacity");
  }
  
  const earnedAchievements = appData.achievements.filter(a => a.earned).length;
  if (earnedAchievements >= 3) {
    strengths.push("Achievement of meaningful productivity milestones");
  }
  
  if (appData.brainDumpEntries.length >= 5) {
    strengths.push("Effective use of external memory strategies");
  }
  
  return strengths;
}

function mapAchievementToClinicalSignificance(achievement) {
  const significanceMap = {
    "Early Bird": "Demonstrates improved morning routine and task initiation",
    "Focus Ninja": "Shows sustained attention capacity and focus endurance",
    "Streak Master": "Indicates strong habit formation and consistency",
    "Task Crusher": "Reflects effective executive function and task completion"
  };
  
  return significanceMap[achievement.name] || "Positive productivity milestone achievement";
}

function calculateProgressIndicator() {
  const pointsPerLevel = 500;
  const currentLevelPoints = appData.user.points % pointsPerLevel;
  const progressPercentage = (currentLevelPoints / pointsPerLevel) * 100;
  
  return {
    currentLevelProgress: parseFloat(progressPercentage.toFixed(1)),
    pointsToNextLevel: pointsPerLevel - currentLevelPoints,
    levelProgressDescription: `${progressPercentage.toFixed(1)}% progress to Level ${appData.user.level + 1}`
  };
}

// Test function to verify healthcare report generation
function testHealthcareReport() {
  try {
    const report = generateHealthcareReport();
    console.log('Healthcare report generated successfully:', report);
    return report;
  } catch (error) {
    console.error('Healthcare report test failed:', error);
    return null;
  }
}

// Healthcare Provider Sharing Functions
function shareWithProvider() {
  // Check browser compatibility
  if (!checkBrowserCompatibility()) {
    showSharingErrorFeedback('Your browser does not support healthcare sharing features. Please use a modern browser.');
    return;
  }
  
  // Show loading state on button
  const shareButton = document.querySelector('.share-btn');
  if (shareButton) {
    shareButton.classList.add('loading');
    shareButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Report...';
  }
  
  try {
    // Validate data before generating report
    if (!validateDataIntegrity()) {
      throw new Error('Data validation failed. Unable to generate healthcare report.');
    }
    
    // Generate healthcare report for sharing
    const healthcareReport = generateHealthcareReport();
    
    if (!healthcareReport) {
      throw new Error('Failed to generate healthcare report. Please try again.');
    }
    
    console.log('Healthcare report generated for sharing:', healthcareReport);
    
    // Reset button state
    if (shareButton) {
      shareButton.classList.remove('loading');
      shareButton.innerHTML = '<i class="fa-solid fa-share-medical"></i> Share with Healthcare Provider';
    }
    
    // Show the sharing modal with the report
    showHealthcareSharingModal(healthcareReport);
    
  } catch (error) {
    console.error('Failed to generate healthcare report:', error);
    
    // Reset button state
    if (shareButton) {
      shareButton.classList.remove('loading');
      shareButton.innerHTML = '<i class="fa-solid fa-share-medical"></i> Share with Healthcare Provider';
    }
    
    // Provide specific error messages
    let userFriendlyMessage = 'Error generating healthcare report.';
    
    if (error.message.includes('validation')) {
      userFriendlyMessage = 'Unable to generate report due to incomplete data. Please ensure you have some tasks and focus sessions recorded.';
    } else if (error.message.includes('network')) {
      userFriendlyMessage = 'Network error occurred while preparing the report. Please check your connection.';
    } else if (error.message.includes('memory') || error.message.includes('quota')) {
      userFriendlyMessage = 'Insufficient memory to generate report. Please close other browser tabs and try again.';
    }
    
    showSharingErrorFeedback(userFriendlyMessage, error.message);
  }
}

function showHealthcareSharingModal(healthcareReport) {
  const modal = document.getElementById('healthcare-sharing-modal');
  if (!modal) {
    console.error('Healthcare sharing modal not found');
    return;
  }
  
  // Populate report date
  const reportDateElement = document.getElementById('report-date');
  if (reportDateElement) {
    const reportDate = new Date(healthcareReport.reportMetadata.reportDate);
    reportDateElement.textContent = reportDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Populate report content
  const reportContent = document.getElementById('healthcare-report-content');
  if (reportContent) {
    reportContent.innerHTML = generateReportHTML(healthcareReport);
  }
  
  // Store report data for sharing functions
  window.currentHealthcareReport = healthcareReport;
  
  // Show modal
  modal.classList.remove('hidden');
  modal.classList.add('show');
}

function closeHealthcareSharingModal() {
  const modal = document.getElementById('healthcare-sharing-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }
  
  // Clear stored report data
  window.currentHealthcareReport = null;
}

function generateReportHTML(report) {
  return `
    <div class="report-section">
      <h5><i class="fa-solid fa-chart-line"></i> Executive Summary</h5>
      <div class="report-metrics">
        <div class="metric-item">
          <span class="metric-value">${report.executiveSummary.overallProductivity}</span>
          <span class="metric-label">Overall Productivity</span>
        </div>
        <div class="metric-item">
          <span class="metric-value">${report.keyMetrics.taskManagement.completionRate}%</span>
          <span class="metric-label">Task Completion Rate</span>
        </div>
        <div class="metric-item">
          <span class="metric-value">${report.keyMetrics.focusAndAttention.totalFocusTime.toFixed(1)}h</span>
          <span class="metric-label">Total Focus Time</span>
        </div>
        <div class="metric-item">
          <span class="metric-value">${appData.user.currentStreak}</span>
          <span class="metric-label">Current Streak (days)</span>
        </div>
      </div>
      
      <div class="report-insights">
        <h6>Key Findings:</h6>
        <ul class="insight-list">
          ${report.executiveSummary.keyFindings.map(finding => 
            `<li><i class="fa-solid fa-circle-check"></i> ${finding}</li>`
          ).join('')}
        </ul>
      </div>
    </div>
    
    <div class="report-section">
      <h5><i class="fa-solid fa-brain"></i> Focus & Attention Patterns</h5>
      <div class="report-metrics">
        <div class="metric-item">
          <span class="metric-value">${report.keyMetrics.focusAndAttention.totalFocusSessions}</span>
          <span class="metric-label">Focus Sessions</span>
        </div>
        <div class="metric-item">
          <span class="metric-value">${report.keyMetrics.focusAndAttention.averageSessionLength} min</span>
          <span class="metric-label">Avg Session Length</span>
        </div>
        <div class="metric-item">
          <span class="metric-value">${report.keyMetrics.focusAndAttention.focusConsistency}%</span>
          <span class="metric-label">Focus Consistency</span>
        </div>
      </div>
    </div>
    
    <div class="report-section">
      <h5><i class="fa-solid fa-list-check"></i> Task Management</h5>
      <div class="report-metrics">
        <div class="metric-item">
          <span class="metric-value">${report.keyMetrics.taskManagement.totalTasksAttempted}</span>
          <span class="metric-label">Total Tasks</span>
        </div>
        <div class="metric-item">
          <span class="metric-value">${report.keyMetrics.taskManagement.tasksCompleted}</span>
          <span class="metric-label">Completed Tasks</span>
        </div>
        <div class="metric-item">
          <span class="metric-value">${report.keyMetrics.taskManagement.averageTaskDuration} min</span>
          <span class="metric-label">Avg Task Duration</span>
        </div>
      </div>
    </div>
    
    <div class="report-section">
      <h5><i class="fa-solid fa-lightbulb"></i> Clinical Insights</h5>
      <div class="report-insights">
        <h6>Behavioral Patterns:</h6>
        <ul class="insight-list">
          <li><i class="fa-solid fa-circle-check"></i> Most productive days: ${report.behavioralPatterns.mostProductiveDays.join(', ')}</li>
          <li><i class="fa-solid fa-circle-check"></i> Strength areas: ${report.behavioralPatterns.strengthAreas.join(', ')}</li>
          ${report.behavioralPatterns.challengeAreas.length > 0 ? 
            `<li><i class="fa-solid fa-triangle-exclamation"></i> Challenge areas: ${report.behavioralPatterns.challengeAreas.join(', ')}</li>` : ''
          }
        </ul>
      </div>
    </div>
  `;
}

function copyReportToClipboard() {
  const button = document.querySelector('.copy-btn');
  const originalContent = button.innerHTML;
  
  if (!window.currentHealthcareReport) {
    showSharingErrorFeedback('No report data available to copy.');
    return;
  }
  
  // Check clipboard API support
  if (!navigator.clipboard) {
    showSharingErrorFeedback('Clipboard functionality is not supported in your browser. Please use a modern browser or try the PDF option.');
    return;
  }
  
  // Show loading state
  button.classList.add('loading');
  button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Copying...';
  
  try {
    // Generate text version of the report
    const reportText = generateReportText(window.currentHealthcareReport);
    
    if (!reportText || reportText.trim().length === 0) {
      throw new Error('Generated report text is empty');
    }
    
    // Copy to clipboard with timeout
    const copyPromise = navigator.clipboard.writeText(reportText);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Copy operation timed out')), 5000)
    );
    
    Promise.race([copyPromise, timeoutPromise])
      .then(() => {
        // Show success state
        button.classList.remove('loading');
        button.classList.add('success');
        button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        
        showQuickActionFeedback('Healthcare report copied to clipboard successfully!');
        
        // Reset button after 2 seconds
        setTimeout(() => {
          button.classList.remove('success');
          button.innerHTML = originalContent;
        }, 2000);
        
      }).catch(error => {
        console.error('Failed to copy to clipboard:', error);
        
        // Reset button state
        button.classList.remove('loading');
        button.innerHTML = originalContent;
        
        // Provide specific error messages
        let errorMessage = 'Failed to copy report to clipboard.';
        if (error.message.includes('timeout')) {
          errorMessage = 'Copy operation timed out. Please try again or use the PDF option.';
        } else if (error.message.includes('permission')) {
          errorMessage = 'Permission denied. Please allow clipboard access in your browser settings.';
        } else if (error.message.includes('NotAllowedError')) {
          errorMessage = 'Clipboard access blocked. Please allow clipboard permissions and try again.';
        }
        
        showSharingErrorFeedback(errorMessage, error.message);
      });
    
  } catch (error) {
    console.error('Error generating report text:', error);
    button.classList.remove('loading');
    button.innerHTML = originalContent;
    
    let errorMessage = 'Error preparing report for copying.';
    if (error.message.includes('empty')) {
      errorMessage = 'Report content is empty. Please refresh the page and try again.';
    }
    
    showSharingErrorFeedback(errorMessage, error.message);
  }
}

function generatePDFReport() {
  const button = document.querySelector('.pdf-btn');
  const originalContent = button.innerHTML;
  
  if (!window.currentHealthcareReport) {
    showSharingErrorFeedback('No report data available for PDF generation.');
    return;
  }
  
  // Check popup blocker and window.open support
  if (!window.open) {
    showSharingErrorFeedback('PDF generation is not supported in your browser. Please try copying the report instead.');
    return;
  }
  
  // Show loading state
  button.classList.add('loading');
  button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
  
  try {
    // Generate HTML content for PDF with error handling
    let pdfContent;
    try {
      pdfContent = generatePDFContent(window.currentHealthcareReport);
      if (!pdfContent || pdfContent.trim().length === 0) {
        throw new Error('Generated PDF content is empty');
      }
    } catch (contentError) {
      throw new Error('Failed to generate PDF content: ' + contentError.message);
    }
    
    // Simulate PDF generation with timeout and error handling
    const pdfTimeout = setTimeout(() => {
      try {
        // Test if popup was blocked
        const testWindow = window.open('', '_blank');
        if (!testWindow || testWindow.closed || typeof testWindow.closed === 'undefined') {
          throw new Error('Popup blocked by browser');
        }
        testWindow.close();
        
        // Create the actual PDF window
        const pdfWindow = window.open('', '_blank');
        if (!pdfWindow) {
          throw new Error('Failed to open PDF window - popup may be blocked');
        }
        
        // Write content to the window
        pdfWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Healthcare Report - ${appData.user.name}</title>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
              .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
              .section { margin-bottom: 25px; }
              .metrics { display: flex; flex-wrap: wrap; gap: 15px; margin: 15px 0; }
              .metric { border: 1px solid #ddd; padding: 10px; border-radius: 5px; min-width: 120px; text-align: center; }
              .metric-value { font-size: 18px; font-weight: bold; color: #9013FE; }
              .metric-label { font-size: 12px; color: #666; }
              ul { margin: 10px 0; padding-left: 20px; }
              @media print { body { margin: 0; } }
              .error-message { color: red; padding: 20px; text-align: center; }
            </style>
          </head>
          <body>
            ${pdfContent}
            <script>
              try {
                window.print();
              } catch (e) {
                document.body.innerHTML = '<div class="error-message">Print function failed. Please use Ctrl+P to print manually.</div>';
              }
            </script>
          </body>
          </html>
        `);
        pdfWindow.document.close();
        
        // Show success state
        button.classList.remove('loading');
        button.classList.add('success');
        button.innerHTML = '<i class="fa-solid fa-check"></i> Generated!';
        
        showQuickActionFeedback('PDF report generated and opened for printing!');
        
        // Reset button after 2 seconds
        setTimeout(() => {
          button.classList.remove('success');
          button.innerHTML = originalContent;
        }, 2000);
        
      } catch (pdfError) {
        console.error('PDF generation error:', pdfError);
        
        // Reset button state
        button.classList.remove('loading');
        button.innerHTML = originalContent;
        
        // Provide specific error messages
        let errorMessage = 'Error generating PDF report.';
        if (pdfError.message.includes('popup') || pdfError.message.includes('blocked')) {
          errorMessage = 'PDF generation blocked by popup blocker. Please allow popups for this site and try again.';
        } else if (pdfError.message.includes('window')) {
          errorMessage = 'Unable to open PDF window. Please check your browser settings and try again.';
        } else if (pdfError.message.includes('empty')) {
          errorMessage = 'PDF content is empty. Please refresh the page and try again.';
        }
        
        showSharingErrorFeedback(errorMessage, pdfError.message);
      }
    }, 1500);
    
  } catch (error) {
    console.error('Error in PDF generation setup:', error);
    clearTimeout(pdfTimeout);
    button.classList.remove('loading');
    button.innerHTML = originalContent;
    
    let errorMessage = 'Error setting up PDF generation.';
    if (error.message.includes('content')) {
      errorMessage = 'Failed to prepare PDF content. Please try again or use the copy option.';
    }
    
    showSharingErrorFeedback(errorMessage, error.message);
  }
}

function shareViaEmail() {
  const button = document.querySelector('.email-btn');
  const originalContent = button.innerHTML;
  
  if (!window.currentHealthcareReport) {
    showSharingErrorFeedback('No report data available for email sharing.');
    return;
  }
  
  // Show loading state
  button.classList.add('loading');
  button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing...';
  
  try {
    // Generate email content with error handling
    let emailSubject, emailBody;
    
    try {
      emailSubject = `Healthcare Report - ${appData.user.name} - ${new Date().toLocaleDateString()}`;
      emailBody = generateEmailBody(window.currentHealthcareReport);
      
      if (!emailBody || emailBody.trim().length === 0) {
        throw new Error('Generated email body is empty');
      }
      
      // Check if email content is too long (some email clients have limits)
      if (emailBody.length > 32000) {
        emailBody = emailBody.substring(0, 32000) + '\n\n[Report truncated due to length limits. Please use the PDF option for the complete report.]';
      }
      
    } catch (contentError) {
      throw new Error('Failed to generate email content: ' + contentError.message);
    }
    
    // Create mailto link with error handling
    let mailtoLink;
    try {
      mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Check if mailto link is too long (some systems have URL length limits)
      if (mailtoLink.length > 8000) {
        // Fallback to shorter email content
        const shortEmailBody = generateShortEmailBody(window.currentHealthcareReport);
        mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(shortEmailBody)}`;
      }
      
    } catch (linkError) {
      throw new Error('Failed to create email link: ' + linkError.message);
    }
    
    // Test if mailto is supported
    const testLink = document.createElement('a');
    testLink.href = 'mailto:test@example.com';
    if (!testLink.protocol || testLink.protocol !== 'mailto:') {
      throw new Error('Email functionality not supported');
    }
    
    // Open email client with timeout
    try {
      window.location.href = mailtoLink;
      
      // Show success state
      button.classList.remove('loading');
      button.classList.add('success');
      button.innerHTML = '<i class="fa-solid fa-check"></i> Email Ready!';
      
      showQuickActionFeedback('Email client opened with healthcare report!');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        button.classList.remove('success');
        button.innerHTML = originalContent;
      }, 3000);
      
    } catch (openError) {
      throw new Error('Failed to open email client: ' + openError.message);
    }
    
  } catch (error) {
    console.error('Error preparing email:', error);
    button.classList.remove('loading');
    button.innerHTML = originalContent;
    
    // Provide specific error messages
    let errorMessage = 'Error preparing email.';
    if (error.message.includes('empty')) {
      errorMessage = 'Email content is empty. Please refresh the page and try again.';
    } else if (error.message.includes('not supported')) {
      errorMessage = 'Email functionality is not available. Please copy the report and paste it into your email client manually.';
    } else if (error.message.includes('client')) {
      errorMessage = 'Unable to open email client. Please ensure you have an email application configured.';
    } else if (error.message.includes('content')) {
      errorMessage = 'Failed to prepare email content. Please try the copy or PDF options instead.';
    }
    
    showSharingErrorFeedback(errorMessage, error.message);
  }
}

function generateReportText(report) {
  const reportDate = new Date(report.reportMetadata.reportDate).toLocaleDateString();
  
  return `
HEALTHCARE PRODUCTIVITY REPORT
Generated: ${reportDate}
Patient: ${report.reportMetadata.patientName}
Report Type: ${report.reportMetadata.reportType}
Date Range: ${report.reportMetadata.dateRange.start} to ${report.reportMetadata.dateRange.end} (${report.reportMetadata.dateRange.duration})

EXECUTIVE SUMMARY
Overall Productivity: ${report.executiveSummary.overallProductivity}

Key Findings:
${report.executiveSummary.keyFindings.map(finding => `• ${finding}`).join('\n')}

TASK MANAGEMENT METRICS
• Total Tasks Attempted: ${report.keyMetrics.taskManagement.totalTasksAttempted}
• Tasks Completed: ${report.keyMetrics.taskManagement.tasksCompleted}
• Completion Rate: ${report.keyMetrics.taskManagement.completionRate}%
• Average Task Duration: ${report.keyMetrics.taskManagement.averageTaskDuration} minutes

FOCUS & ATTENTION PATTERNS
• Total Focus Sessions: ${report.keyMetrics.focusAndAttention.totalFocusSessions}
• Total Focus Time: ${report.keyMetrics.focusAndAttention.totalFocusTime.toFixed(1)} hours
• Average Session Length: ${report.keyMetrics.focusAndAttention.averageSessionLength} minutes
• Focus Consistency: ${report.keyMetrics.focusAndAttention.focusConsistency}%

BEHAVIORAL PATTERNS
• Most Productive Days: ${report.behavioralPatterns.mostProductiveDays.join(', ')}
• Strength Areas: ${report.behavioralPatterns.strengthAreas.join(', ')}
${report.behavioralPatterns.challengeAreas.length > 0 ? `• Challenge Areas: ${report.behavioralPatterns.challengeAreas.join(', ')}` : ''}

PROGRESS TRACKING
• Current Level: ${report.progressTracking.levelProgression.currentLevel} (${report.progressTracking.levelProgression.levelTitle})
• Total Points: ${report.progressTracking.levelProgression.totalPoints}
• Achievement Completion Rate: ${report.progressTracking.achievementsMilestones.completionRate}%

This report was generated by FoFlow ADHD Coach application.
  `.trim();
}

// Helper Functions for Error Handling and Browser Compatibility

function checkBrowserCompatibility() {
  try {
    // Check for required APIs
    const requiredAPIs = [
      'JSON',
      'Blob',
      'URL',
      'document.createElement'
    ];
    
    for (const api of requiredAPIs) {
      if (api.includes('.')) {
        const parts = api.split('.');
        let obj = window;
        for (const part of parts) {
          if (!obj[part]) {
            console.warn(`Missing API: ${api}`);
            return false;
          }
          obj = obj[part];
        }
      } else if (!window[api]) {
        console.warn(`Missing API: ${api}`);
        return false;
      }
    }
    
    // Check for modern browser features
    if (!window.addEventListener) {
      console.warn('Missing addEventListener support');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Browser compatibility check failed:', error);
    return false;
  }
}

function validateDataIntegrity() {
  try {
    // Check if appData exists and has required structure
    if (!appData || typeof appData !== 'object') {
      console.error('appData is missing or invalid');
      return false;
    }
    
    // Check required data sections
    const requiredSections = ['user', 'tasks', 'achievements', 'brainDumpEntries', 'weeklyProgress'];
    for (const section of requiredSections) {
      if (!appData[section]) {
        console.error(`Missing required data section: ${section}`);
        return false;
      }
    }
    
    // Validate user data
    if (!appData.user.name || typeof appData.user.points !== 'number') {
      console.error('Invalid user data structure');
      return false;
    }
    
    // Validate arrays
    if (!Array.isArray(appData.tasks) || !Array.isArray(appData.achievements) || 
        !Array.isArray(appData.brainDumpEntries) || !Array.isArray(appData.weeklyProgress)) {
      console.error('Invalid array data structures');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Data validation failed:', error);
    return false;
  }
}

function getTroubleshootingTips(errorMessage) {
  const tips = [];
  
  if (errorMessage.includes('storage') || errorMessage.includes('quota')) {
    tips.push('Clear your browser cache and cookies');
    tips.push('Close other browser tabs to free up memory');
    tips.push('Try using an incognito/private browsing window');
  }
  
  if (errorMessage.includes('permission') || errorMessage.includes('blocked')) {
    tips.push('Check your browser\'s download settings');
    tips.push('Allow downloads from this website');
    tips.push('Disable popup blockers for this site');
  }
  
  if (errorMessage.includes('network') || errorMessage.includes('connection')) {
    tips.push('Check your internet connection');
    tips.push('Try refreshing the page');
    tips.push('Disable browser extensions temporarily');
  }
  
  if (errorMessage.includes('browser') || errorMessage.includes('support')) {
    tips.push('Update your browser to the latest version');
    tips.push('Try using Chrome, Firefox, or Safari');
    tips.push('Enable JavaScript in your browser settings');
  }
  
  if (errorMessage.includes('data') || errorMessage.includes('validation')) {
    tips.push('Refresh the page and try again');
    tips.push('Ensure you have some tasks and focus sessions recorded');
    tips.push('Clear browser data and reload the application');
  }
  
  // Default tips if no specific ones apply
  if (tips.length === 0) {
    tips.push('Refresh the page and try again');
    tips.push('Try using a different browser');
    tips.push('Contact support if the problem persists');
  }
  
  return tips;
}

function showTechnicalDetails(details) {
  // Create technical details modal
  let detailsModal = document.getElementById('technical-details-modal');
  if (!detailsModal) {
    detailsModal = document.createElement('div');
    detailsModal.id = 'technical-details-modal';
    detailsModal.className = 'break-modal';
    document.body.appendChild(detailsModal);
  }
  
  detailsModal.innerHTML = `
    <div class="break-content">
      <div class="break-header">
        <h3><i class="fa-solid fa-bug"></i> Technical Details</h3>
        <button class="close-break" onclick="closeTechnicalDetails()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      <div class="technical-details-content">
        <p><strong>Error Details:</strong></p>
        <div class="error-details-box">
          <code>${details}</code>
        </div>
        <p><strong>Browser Information:</strong></p>
        <div class="browser-info">
          <p>User Agent: ${navigator.userAgent}</p>
          <p>Platform: ${navigator.platform}</p>
          <p>Language: ${navigator.language}</p>
          <p>Cookies Enabled: ${navigator.cookieEnabled}</p>
          <p>Online: ${navigator.onLine}</p>
        </div>
        <p><em>You can share this information with support for faster assistance.</em></p>
      </div>
    </div>
  `;
  
  detailsModal.classList.add('show');
}

function closeTechnicalDetails() {
  const detailsModal = document.getElementById('technical-details-modal');
  if (detailsModal) {
    detailsModal.classList.remove('show');
  }
}

function showSharingErrorFeedback(userMessage, technicalDetails = null) {
  // Create or update sharing error notification
  let errorNotification = document.getElementById('sharing-error');
  if (!errorNotification) {
    errorNotification = document.createElement('div');
    errorNotification.id = 'sharing-error';
    errorNotification.className = 'export-notification error';
    document.body.appendChild(errorNotification);
  }
  
  const troubleshootingTips = getTroubleshootingTips(userMessage);
  
  errorNotification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        <i class="fa-solid fa-exclamation-triangle"></i>
      </div>
      <div class="notification-text">
        <h4>Sharing Failed</h4>
        <p>${userMessage || 'An error occurred while sharing your healthcare report.'}</p>
        ${troubleshootingTips ? `<div class="troubleshooting-tips">
          <strong>Troubleshooting:</strong>
          <ul>${troubleshootingTips.map(tip => `<li>${tip}</li>`).join('')}</ul>
        </div>` : ''}
        <div class="error-actions">
          <button class="btn-secondary retry-btn" onclick="shareWithProvider()">
            <i class="fa-solid fa-retry"></i> Retry Sharing
          </button>
          ${technicalDetails ? `<button class="btn-secondary details-btn" onclick="showTechnicalDetails('${technicalDetails.replace(/'/g, "\\'")}')">
            <i class="fa-solid fa-info-circle"></i> Technical Details
          </button>` : ''}
        </div>
      </div>
    </div>
  `;
  
  errorNotification.classList.add('show');
  
  // Auto-hide after 10 seconds
  setTimeout(() => {
    errorNotification.classList.remove('show');
  }, 10000);
}

function generateShortEmailBody(report) {
  const reportDate = new Date(report.reportMetadata.reportDate).toLocaleDateString();
  
  return `
Healthcare Productivity Report - ${report.reportMetadata.patientName}
Generated: ${reportDate}

SUMMARY:
• Overall Productivity: ${report.executiveSummary.overallProductivity}
• Task Completion Rate: ${report.keyMetrics.taskManagement.completionRate}%
• Total Focus Time: ${report.keyMetrics.focusAndAttention.totalFocusTime.toFixed(1)} hours
• Focus Sessions: ${report.keyMetrics.focusAndAttention.totalFocusSessions}

KEY FINDINGS:
${report.executiveSummary.keyFindings.slice(0, 3).map(finding => `• ${finding}`).join('\n')}

For the complete report, please use the PDF or copy options in the application.

Generated by FoFlow ADHD Coach
  `.trim();
}

// Enhanced loading states for buttons
function setButtonLoadingState(button, loadingText) {
  if (!button) return;
  
  button.dataset.originalContent = button.innerHTML;
  button.classList.add('loading');
  button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${loadingText}`;
  button.disabled = true;
}

function setButtonSuccessState(button, successText, duration = 2000) {
  if (!button) return;
  
  button.classList.remove('loading');
  button.classList.add('success');
  button.innerHTML = `<i class="fa-solid fa-check"></i> ${successText}`;
  button.disabled = false;
  
  setTimeout(() => {
    resetButtonState(button);
  }, duration);
}

function resetButtonState(button) {
  if (!button) return;
  
  button.classList.remove('loading', 'success');
  button.innerHTML = button.dataset.originalContent || button.innerHTML;
  button.disabled = false;
}

// Enhanced error handling for unsupported browsers
function handleUnsupportedBrowser() {
  const unsupportedMessage = `
    <div class="unsupported-browser-warning">
      <h3><i class="fa-solid fa-exclamation-triangle"></i> Browser Not Supported</h3>
      <p>Your browser doesn't support all the features needed for healthcare data sharing.</p>
      <div class="browser-recommendations">
        <h4>Recommended Browsers:</h4>
        <ul>
          <li><strong>Chrome</strong> (version 80 or newer)</li>
          <li><strong>Firefox</strong> (version 75 or newer)</li>
          <li><strong>Safari</strong> (version 13 or newer)</li>
          <li><strong>Edge</strong> (version 80 or newer)</li>
        </ul>
      </div>
      <p><em>Please update your browser or try a different one for the best experience.</em></p>
    </div>
  `;
  
  // Show warning in healthcare actions area
  const healthcareActions = document.querySelector('.healthcare-actions');
  if (healthcareActions) {
    healthcareActions.innerHTML = unsupportedMessage;
    healthcareActions.style.background = 'rgba(220, 53, 69, 0.1)';
    healthcareActions.style.border = '2px solid var(--danger)';
  }
}

// Initialize error handling on page load
function initializeErrorHandling() {
  // Check browser compatibility on load
  if (!checkBrowserCompatibility()) {
    console.warn('Browser compatibility issues detected');
    handleUnsupportedBrowser();
    return false;
  }
  
  // Add global error handlers
  window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
    
    // If error is related to healthcare functions, show user-friendly message
    if (event.error && event.error.stack && 
        (event.error.stack.includes('exportUserData') || 
         event.error.stack.includes('shareWithProvider'))) {
      showQuickActionFeedback('An unexpected error occurred. Please refresh the page and try again.');
    }
  });
  
  // Add unhandled promise rejection handler
  window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Prevent default browser error handling
    event.preventDefault();
    
    // Show user-friendly message for healthcare-related promise rejections
    if (event.reason && event.reason.toString().includes('healthcare')) {
      showQuickActionFeedback('A network or processing error occurred. Please try again.');
    }
  });
  
  // Monitor for quota exceeded errors (storage issues)
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage.estimate().then(estimate => {
      const usagePercentage = (estimate.usage / estimate.quota) * 100;
      if (usagePercentage > 90) {
        console.warn('Storage quota nearly exceeded:', usagePercentage + '%');
      }
    }).catch(error => {
      console.warn('Could not check storage quota:', error);
    });
  }
  
  return true;
}

// Fallback functions for unsupported browsers
function fallbackExportData() {
  try {
    const exportData = generateExportData();
    const jsonString = JSON.stringify(exportData, null, 2);
    
    // Create a text area with the data for manual copying
    const fallbackModal = document.createElement('div');
    fallbackModal.className = 'break-modal';
    fallbackModal.innerHTML = `
      <div class="break-content" style="max-width: 600px;">
        <div class="break-header">
          <h3><i class="fa-solid fa-copy"></i> Manual Export</h3>
          <button class="close-break" onclick="this.parentElement.parentElement.parentElement.remove()">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div style="margin-bottom: 15px;">
          <p>Your browser doesn't support automatic downloads. Please copy the data below and save it to a file:</p>
        </div>
        <textarea readonly style="width: 100%; height: 300px; font-family: monospace; font-size: 12px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">${jsonString}</textarea>
        <div style="margin-top: 15px;">
          <button class="btn-primary" onclick="navigator.clipboard ? navigator.clipboard.writeText(this.parentElement.previousElementSibling.value) : null; showQuickActionFeedback('Data copied to clipboard!');">
            <i class="fa-solid fa-copy"></i> Copy to Clipboard
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(fallbackModal);
    fallbackModal.classList.add('show');
    
  } catch (error) {
    console.error('Fallback export failed:', error);
    showQuickActionFeedback('Export failed. Please try refreshing the page.');
  }
}

function fallbackShareReport() {
  try {
    const healthcareReport = generateHealthcareReport();
    const reportText = generateReportText(healthcareReport);
    
    // Create a modal with the report text for manual copying
    const fallbackModal = document.createElement('div');
    fallbackModal.className = 'break-modal';
    fallbackModal.innerHTML = `
      <div class="break-content" style="max-width: 600px;">
        <div class="break-header">
          <h3><i class="fa-solid fa-share"></i> Manual Sharing</h3>
          <button class="close-break" onclick="this.parentElement.parentElement.parentElement.remove()">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div style="margin-bottom: 15px;">
          <p>Your browser doesn't support advanced sharing features. Please copy the report below and share it manually:</p>
        </div>
        <textarea readonly style="width: 100%; height: 300px; font-family: monospace; font-size: 12px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">${reportText}</textarea>
        <div style="margin-top: 15px;">
          <button class="btn-primary" onclick="navigator.clipboard ? navigator.clipboard.writeText(this.parentElement.previousElementSibling.value) : null; showQuickActionFeedback('Report copied to clipboard!');">
            <i class="fa-solid fa-copy"></i> Copy Report
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(fallbackModal);
    fallbackModal.classList.add('show');
    
  } catch (error) {
    console.error('Fallback sharing failed:', error);
    showQuickActionFeedback('Sharing failed. Please try refreshing the page.');
  }
}

// Update the original functions to use fallbacks when needed
const originalExportUserData = exportUserData;
const originalShareWithProvider = shareWithProvider;

// Override with enhanced error handling
window.exportUserData = function() {
  if (!checkBrowserCompatibility()) {
    fallbackExportData();
    return;
  }
  originalExportUserData();
};

window.shareWithProvider = function() {
  if (!checkBrowserCompatibility()) {
    fallbackShareReport();
    return;
  }
  originalShareWithProvider();
};

function generatePDFContent(report) {
  const reportDate = new Date(report.reportMetadata.reportDate).toLocaleDateString();
  
  return `
    <div class="header">
      <h1>Healthcare Productivity Report</h1>
      <p><strong>Patient:</strong> ${report.reportMetadata.patientName}</p>
      <p><strong>Generated:</strong> ${reportDate}</p>
      <p><strong>Date Range:</strong> ${report.reportMetadata.dateRange.start} to ${report.reportMetadata.dateRange.end}</p>
    </div>
    
    <div class="section">
      <h2>Executive Summary</h2>
      <p><strong>Overall Productivity:</strong> ${report.executiveSummary.overallProductivity}</p>
      <h3>Key Findings:</h3>
      <ul>
        ${report.executiveSummary.keyFindings.map(finding => `<li>${finding}</li>`).join('')}
      </ul>
    </div>
    
    <div class="section">
      <h2>Task Management Metrics</h2>
      <div class="metrics">
        <div class="metric">
          <div class="metric-value">${report.keyMetrics.taskManagement.totalTasksAttempted}</div>
          <div class="metric-label">Total Tasks</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.keyMetrics.taskManagement.tasksCompleted}</div>
          <div class="metric-label">Completed</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.keyMetrics.taskManagement.completionRate}%</div>
          <div class="metric-label">Completion Rate</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.keyMetrics.taskManagement.averageTaskDuration} min</div>
          <div class="metric-label">Avg Duration</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2>Focus & Attention Patterns</h2>
      <div class="metrics">
        <div class="metric">
          <div class="metric-value">${report.keyMetrics.focusAndAttention.totalFocusSessions}</div>
          <div class="metric-label">Focus Sessions</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.keyMetrics.focusAndAttention.totalFocusTime.toFixed(1)}h</div>
          <div class="metric-label">Total Focus Time</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.keyMetrics.focusAndAttention.averageSessionLength} min</div>
          <div class="metric-label">Avg Session</div>
        </div>
        <div class="metric">
          <div class="metric-value">${report.keyMetrics.focusAndAttention.focusConsistency}%</div>
          <div class="metric-label">Consistency</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2>Behavioral Patterns</h2>
      <ul>
        <li><strong>Most Productive Days:</strong> ${report.behavioralPatterns.mostProductiveDays.join(', ')}</li>
        <li><strong>Strength Areas:</strong> ${report.behavioralPatterns.strengthAreas.join(', ')}</li>
        ${report.behavioralPatterns.challengeAreas.length > 0 ? 
          `<li><strong>Challenge Areas:</strong> ${report.behavioralPatterns.challengeAreas.join(', ')}</li>` : ''
        }
      </ul>
    </div>
    
    <div class="section">
      <h2>Progress Tracking</h2>
      <p><strong>Current Level:</strong> ${report.progressTracking.levelProgression.currentLevel} (${report.progressTracking.levelProgression.levelTitle})</p>
      <p><strong>Total Points:</strong> ${report.progressTracking.levelProgression.totalPoints}</p>
      <p><strong>Achievement Completion Rate:</strong> ${report.progressTracking.achievementsMilestones.completionRate}%</p>
    </div>
  `;
}

function generateEmailBody(report) {
  return `Dear Healthcare Provider,

Please find attached the productivity report for ${report.reportMetadata.patientName} generated from the FoFlow ADHD Coach application.

REPORT SUMMARY:
• Report Date: ${new Date(report.reportMetadata.reportDate).toLocaleDateString()}
• Date Range: ${report.reportMetadata.dateRange.start} to ${report.reportMetadata.dateRange.end}
• Overall Productivity: ${report.executiveSummary.overallProductivity}

KEY METRICS:
• Task Completion Rate: ${report.keyMetrics.taskManagement.completionRate}%
• Total Focus Time: ${report.keyMetrics.focusAndAttention.totalFocusTime.toFixed(1)} hours
• Focus Sessions: ${report.keyMetrics.focusAndAttention.totalFocusSessions}
• Current Streak: ${appData.user.currentStreak} days

BEHAVIORAL INSIGHTS:
• Most Productive Days: ${report.behavioralPatterns.mostProductiveDays.join(', ')}
• Strength Areas: ${report.behavioralPatterns.strengthAreas.join(', ')}

This report provides insights into daily productivity patterns, task completion rates, focus session data, and overall progress trends that may be relevant for ADHD management and treatment planning.

For the complete detailed report, please refer to the full document or contact the patient for additional information.

Best regards,
FoFlow ADHD Coach Application

---
This report was automatically generated by FoFlow ADHD Coach.
  `;
}

// Setup modal event listeners for proper interaction handling
function setupModalEventListeners() {
  // Healthcare sharing modal event listeners
  const healthcareModal = document.getElementById('healthcare-sharing-modal');
  if (healthcareModal) {
    // Close modal when clicking outside of modal content
    healthcareModal.addEventListener('click', function(event) {
      if (event.target === healthcareModal) {
        closeHealthcareSharingModal();
      }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && healthcareModal.classList.contains('show')) {
        closeHealthcareSharingModal();
      }
    });
  }
  
  // Add task modal event listeners (if not already present)
  const addTaskModal = document.getElementById('add-task-modal');
  if (addTaskModal) {
    addTaskModal.addEventListener('click', function(event) {
      if (event.target === addTaskModal) {
        closeAddTaskModal();
      }
    });
    
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && addTaskModal.classList.contains('show')) {
        closeAddTaskModal();
      }
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  // Initialize error handling first
  if (!initializeErrorHandling()) {
    console.error('Error handling initialization failed');
    return; // Don't continue if browser is unsupported
  }
  
  // Setup modal event listeners
  setupModalEventListeners();
  
  // Ensure only dashboard is visible initially
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
    view.style.display = 'none';
    console.log('Hiding view:', view.id);
  });
  const dashboard = document.getElementById('dashboard');
  if (dashboard) {
    dashboard.classList.add('active');
    dashboard.style.display = 'block';
    console.log('Dashboard set as active');
  }
  
  // Setup navigation
  setupNavigation();
  
  // Setup quick action buttons
  setupQuickActions();
  
  // Update initial user stats
  updateUserStats();
  
  // Render initial content
  renderDashboard();
  // Only render task planner content if planner tab is active (which it's not initially)
  renderAllTasks(); // Just render the task list for other tabs that need it
  renderFocusTimer();
  renderBrainDump();
  
  // Start clock timer to update every second
  setInterval(updateDateTime, 1000);
  
  // Progress will be rendered when tab is activated

  // Setup modal close
  const addTaskModal = document.getElementById('add-task-modal');
  if (addTaskModal) {
    addTaskModal.addEventListener('click', function(e) {
      if (e.target.id === 'add-task-modal') {
        closeAddTaskModal();
      }
    });
  }
  
  // Setup keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
      const modal = document.getElementById('add-task-modal');
      if (modal && !modal.classList.contains('hidden')) {
        closeAddTaskModal();
      }
    }
  });
  
  // Initial chart render
  setTimeout(() => {
    renderProgressChart();
  }, 500);
  
  console.log('App initialized successfully');
});