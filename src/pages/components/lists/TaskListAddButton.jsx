import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { TaskListMutationDialog } from '../dialog/TaskListMuationDialog'
import { taskListPath } from '../../../app/routes'
import { useAddListMutation } from '../../../app/api/tasks'

export function TaskListAddButton() {
  const addListMutation = useAddListMutation()
  const [dialogOpen, setDialogOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => setDialogOpen(true)}
      >
        List
      </Button>
      {dialogOpen && (
        <TaskListMutationDialog
          onClose={() => setDialogOpen(false)}
          actionTitle="Create"
          title="Create list"
          disabled={addListMutation.isLoading}
          onAction={async title => {
            const list = await addListMutation.mutateAsync({ title })
            setDialogOpen(false)
            navigate(taskListPath(list.id))
          }}
        />
      )}
    </>
  )
}
