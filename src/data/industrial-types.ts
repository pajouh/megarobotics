export interface WhatWeDoCard {
  title: string
  body: string
}

export interface HomeProjectItem {
  title: string
  subtitle: string
}

export interface SolutionItem {
  id: string
  title: string
  description: string
  applications: string[]
  robotTypes: string[]
}

export interface IndustryItem {
  id: string
  title: string
  applications: string[]
}

export interface RobotTechnologyItem {
  id: string
  title: string
  description: string
  applications: string[]
  criteria: string[]
}

export interface TechnologyNetworkItem {
  id: string
  title: string
  description: string
}

export interface ForCustomersSection {
  id: string
  title: string
  body: string
}

export interface ForManufacturersService {
  title: string
  description: string
}

export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  body: string
}
