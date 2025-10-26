'use client'

import React, { useMemo } from 'react'
import { Trophy, Medal, Target, Star, Zap, Crown, Award, Flame, CheckCircle, Calendar, TrendingUp, Badge } from 'lucide-react'
import { useTaskStore } from '@/store/taskStore'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  requirement: number
  progress: number
  unlocked: boolean
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum'
  category: 'completion' | 'streak' | 'productivity' | 'milestone'
}

export default function GoalsAchievements() {
  const { tasks } = useTaskStore()

  const stats = useMemo(() => {
    const completedTasks = tasks.filter(task => task.completed)
    const totalTasks = tasks.length
    const todayCompleted = completedTasks.filter(task => {
      const today = new Date().toDateString()
      return new Date(task.updatedAt).toDateString() === today
    }).length

    // Calculate streak (simplified for demo)
    const currentStreak = 5 // This would be calculated based on daily completion history
    
    return {
      totalCompleted: completedTasks.length,
      totalTasks,
      todayCompleted,
      currentStreak,
      completionRate: totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0
    }
  }, [tasks])

  const achievements: Achievement[] = [
    // Completion Achievements
    {
      id: 'first_task',
      title: 'Getting Started',
      description: 'Complete your first task',
      icon: <CheckCircle className="w-6 h-6" />,
      requirement: 1,
      progress: Math.min(stats.totalCompleted, 1),
      unlocked: stats.totalCompleted >= 1,
      rarity: 'bronze',
      category: 'completion'
    },
    {
      id: 'task_warrior',
      title: 'Task Warrior',
      description: 'Complete 10 tasks',
      icon: <Medal className="w-6 h-6" />,
      requirement: 10,
      progress: Math.min(stats.totalCompleted, 10),
      unlocked: stats.totalCompleted >= 10,
      rarity: 'silver',
      category: 'completion'
    },
    {
      id: 'task_master',
      title: 'Task Master',
      description: 'Complete 50 tasks',
      icon: <Trophy className="w-6 h-6" />,
      requirement: 50,
      progress: Math.min(stats.totalCompleted, 50),
      unlocked: stats.totalCompleted >= 50,
      rarity: 'gold',
      category: 'completion'
    },
    {
      id: 'task_legend',
      title: 'Task Legend',
      description: 'Complete 100 tasks',
      icon: <Crown className="w-6 h-6" />,
      requirement: 100,
      progress: Math.min(stats.totalCompleted, 100),
      unlocked: stats.totalCompleted >= 100,
      rarity: 'platinum',
      category: 'completion'
    },

    // Streak Achievements
    {
      id: 'consistent',
      title: 'Consistent',
      description: 'Complete tasks for 3 days in a row',
      icon: <Flame className="w-6 h-6" />,
      requirement: 3,
      progress: Math.min(stats.currentStreak, 3),
      unlocked: stats.currentStreak >= 3,
      rarity: 'bronze',
      category: 'streak'
    },
    {
      id: 'dedicated',
      title: 'Dedicated',
      description: 'Complete tasks for 7 days in a row',
      icon: <Star className="w-6 h-6" />,
      requirement: 7,
      progress: Math.min(stats.currentStreak, 7),
      unlocked: stats.currentStreak >= 7,
      rarity: 'silver',
      category: 'streak'
    },
    {
      id: 'unstoppable',
      title: 'Unstoppable',
      description: 'Complete tasks for 30 days in a row',
      icon: <Zap className="w-6 h-6" />,
      requirement: 30,
      progress: Math.min(stats.currentStreak, 30),
      unlocked: stats.currentStreak >= 30,
      rarity: 'gold',
      category: 'streak'
    },

    // Productivity Achievements
    {
      id: 'productive_day',
      title: 'Productive Day',
      description: 'Complete 5 tasks in one day',
      icon: <Target className="w-6 h-6" />,
      requirement: 5,
      progress: Math.min(stats.todayCompleted, 5),
      unlocked: stats.todayCompleted >= 5,
      rarity: 'bronze',
      category: 'productivity'
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Achieve 100% completion rate',
      icon: <Award className="w-6 h-6" />,
      requirement: 100,
      progress: stats.completionRate,
      unlocked: stats.completionRate === 100 && stats.totalTasks >= 5,
      rarity: 'platinum',
      category: 'productivity'
    }
  ]

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'bronze': return 'text-amber-600 dark:text-amber-400'
      case 'silver': return 'text-slate-500 dark:text-slate-400'
      case 'gold': return 'text-yellow-500 dark:text-yellow-400'
      case 'platinum': return 'text-purple-600 dark:text-purple-400'
      default: return 'text-slate-600 dark:text-slate-400'
    }
  }

  const getRarityBg = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'bronze': return 'bg-amber-100 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
      case 'silver': return 'bg-slate-100 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800'
      case 'gold': return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'platinum': return 'bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
      default: return 'bg-slate-100 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800'
    }
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const totalAchievements = achievements.length

  return (
    <div className="h-full flex flex-col bg-white/50 dark:bg-secondary-900/50 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-secondary-700/30">
      
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-white/20 dark:border-secondary-700/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-midnight-blue dark:text-frost-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-midnight-blue dark:text-accent-400" />
            Goals & Achievements
          </h2>
          <div className="flex items-center gap-2 bg-midnight-blue/10 dark:bg-accent-500/20 rounded-full px-3 py-1">
            <Badge className="w-4 h-4 text-midnight-blue dark:text-accent-400" />
            <span className="text-sm text-midnight-blue dark:text-frost-white font-semibold">
              {unlockedAchievements.length}/{totalAchievements} Unlocked
            </span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-frost-white/80 dark:bg-secondary-800/80 rounded-xl p-3 border border-slate-gray/10 dark:border-secondary-700/50">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-success-500 dark:text-success-400" />
              <span className="text-xs font-medium text-slate-gray dark:text-cloud-gray">Completed</span>
            </div>
            <span className="text-lg font-bold text-success-600 dark:text-success-400">{stats.totalCompleted}</span>
          </div>
          
          <div className="bg-frost-white/80 dark:bg-secondary-800/80 rounded-xl p-3 border border-slate-gray/10 dark:border-secondary-700/50">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400" />
              <span className="text-xs font-medium text-slate-gray dark:text-cloud-gray">Streak</span>
            </div>
            <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{stats.currentStreak} days</span>
          </div>
          
          <div className="bg-frost-white/80 dark:bg-secondary-800/80 rounded-xl p-3 border border-slate-gray/10 dark:border-secondary-700/50">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-midnight-blue dark:text-accent-400" />
              <span className="text-xs font-medium text-slate-gray dark:text-cloud-gray">Today</span>
            </div>
            <span className="text-lg font-bold text-midnight-blue dark:text-accent-400">{stats.todayCompleted}</span>
          </div>
          
          <div className="bg-frost-white/80 dark:bg-secondary-800/80 rounded-xl p-3 border border-slate-gray/10 dark:border-secondary-700/50">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-accent-500 dark:text-accent-400" />
              <span className="text-xs font-medium text-slate-gray dark:text-cloud-gray">Rate</span>
            </div>
            <span className="text-lg font-bold text-accent-600 dark:text-accent-400">{stats.completionRate}%</span>
          </div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* Recently Unlocked */}
          {unlockedAchievements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-midnight-blue dark:text-frost-white mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Recently Unlocked
              </h3>
              <div className="grid gap-3">
                {unlockedAchievements.slice(-3).reverse().map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`
                      p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105
                      ${getRarityBg(achievement.rarity)}
                      ${achievement.unlocked ? 'shadow-lg' : 'opacity-50'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        flex items-center justify-center w-12 h-12 rounded-xl
                        ${achievement.unlocked 
                          ? getRarityColor(achievement.rarity) 
                          : 'text-slate-400 dark:text-slate-600'
                        }
                        ${achievement.unlocked 
                          ? 'bg-white/80 dark:bg-secondary-800/80' 
                          : 'bg-slate-200 dark:bg-slate-700'
                        }
                      `}>
                        {achievement.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`
                            font-semibold 
                            ${achievement.unlocked 
                              ? 'text-midnight-blue dark:text-frost-white' 
                              : 'text-slate-500 dark:text-slate-400'
                            }
                          `}>
                            {achievement.title}
                          </h4>
                          <span className={`
                            text-xs font-medium px-2 py-1 rounded-full capitalize
                            ${getRarityColor(achievement.rarity)}
                            ${achievement.unlocked ? 'bg-white/50' : 'bg-slate-200 dark:bg-slate-700'}
                          `}>
                            {achievement.rarity}
                          </span>
                        </div>
                        
                        <p className={`
                          text-sm mb-2
                          ${achievement.unlocked 
                            ? 'text-slate-600 dark:text-cloud-gray' 
                            : 'text-slate-400 dark:text-slate-500'
                          }
                        `}>
                          {achievement.description}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div 
                              className={`
                                h-2 rounded-full transition-all duration-500
                                ${achievement.unlocked 
                                  ? 'bg-gradient-to-r from-success-500 to-success-600' 
                                  : 'bg-slate-400 dark:bg-slate-600'
                                }
                              `}
                              style={{ 
                                width: `${(achievement.progress / achievement.requirement) * 100}%` 
                              }}
                            />
                          </div>
                          <span className={`
                            text-xs font-medium
                            ${achievement.unlocked 
                              ? 'text-success-600 dark:text-success-400' 
                              : 'text-slate-500 dark:text-slate-400'
                            }
                          `}>
                            {achievement.progress}/{achievement.requirement}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Achievements */}
          <div>
            <h3 className="text-lg font-semibold text-midnight-blue dark:text-frost-white mb-3">All Achievements</h3>
            <div className="grid gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`
                    p-4 rounded-xl border transition-all duration-300 hover:scale-105
                    ${achievement.unlocked 
                      ? getRarityBg(achievement.rarity) + ' shadow-md' 
                      : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 opacity-60'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-lg
                      ${achievement.unlocked 
                        ? getRarityColor(achievement.rarity) 
                        : 'text-slate-400 dark:text-slate-600'
                      }
                      ${achievement.unlocked 
                        ? 'bg-white/60 dark:bg-secondary-800/60' 
                        : 'bg-slate-200 dark:bg-slate-700'
                      }
                    `}>
                      {achievement.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`
                          text-sm font-semibold 
                          ${achievement.unlocked 
                            ? 'text-midnight-blue dark:text-frost-white' 
                            : 'text-slate-500 dark:text-slate-400'
                          }
                        `}>
                          {achievement.title}
                        </h4>
                        <span className={`
                          text-xs font-medium px-2 py-0.5 rounded-full capitalize
                          ${getRarityColor(achievement.rarity)}
                          ${achievement.unlocked ? 'bg-white/40' : 'bg-slate-200 dark:bg-slate-700'}
                        `}>
                          {achievement.rarity}
                        </span>
                      </div>
                      
                      <p className={`
                        text-xs mb-2
                        ${achievement.unlocked 
                          ? 'text-slate-600 dark:text-cloud-gray' 
                          : 'text-slate-400 dark:text-slate-500'
                        }
                      `}>
                        {achievement.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                          <div 
                            className={`
                              h-1.5 rounded-full transition-all duration-500
                              ${achievement.unlocked 
                                ? 'bg-gradient-to-r from-success-500 to-success-600' 
                                : 'bg-slate-400 dark:bg-slate-600'
                              }
                            `}
                            style={{ 
                              width: `${(achievement.progress / achievement.requirement) * 100}%` 
                            }}
                          />
                        </div>
                        <span className={`
                          text-xs font-medium
                          ${achievement.unlocked 
                            ? 'text-success-600 dark:text-success-400' 
                            : 'text-slate-500 dark:text-slate-400'
                          }
                        `}>
                          {achievement.progress}/{achievement.requirement}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}